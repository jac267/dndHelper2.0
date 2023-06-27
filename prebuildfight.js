function saveFight() {
  askTheServerWhatsNew("visualComponent", "visualComponent");

  output = { ls_token: [] };

  for (const e of document.getElementsByClassName("token")) {
    map_rect = document.getElementById("map").getBoundingClientRect();

    var rect = e.getBoundingClientRect();
    t_token = {
      x: (rect.left - map_rect.left) * (900 / map_rect.width),
      y: (rect.top - map_rect.top) * (900 / map_rect.height),
      picture: visualComponent.TokensIMG[e.id],
      size: e.style.height,
      stats: e.value,
      id: e.id,
    };

    output.ls_token.push(JSON.parse(JSON.stringify(t_token)));
  }

  downloadObjectAsJson(output, currentTurn + "turn");
}

function downloadObjectAsJson(exportObj, exportName) {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function uploadFight(json) {
  for (const e of json.ls_token) {
    document.getElementById("map").appendChild(createToken3(e));

    enemyId += 1;
  }
}

function createToken3(info) {
  var token = document.createElement("div");
  token.id = info.id;

  token.className = "token";
  token.style.height = info.size;
  token.style.width = info.size;
  token.onmouseover = () => overed(token);
  token.onmouseout = () => overed(null);
  token.draggable = true;
  token.onmousedown = () => moveTokenWithMouse(token.id);

  token.value = JSON.parse(JSON.stringify(info.stats));
  token.textContent = info.stats.hitPoint;

  token.style.left = info.x + "px";
  token.style.top = info.y + "px";
  bg = URL.createObjectURL(
    new Blob(
      [new Uint8Array(Object.values(info.picture))],
      { type: "image/png" } /* (1) */
    )
  );

  token.style.backgroundImage = "url(" + bg + ")";
  TheNewToken = {
    key: token.id,
    value: info.picture,
  };

  post("http://10.0.0.42:8080/tokenImg", TheNewToken);
  return token;
}
