function saveFight() {
  output = { ls_token: [] };

  for (const e of document.getElementsByClassName("token")) {
    map_rect = document.getElementById("map").getBoundingClientRect();

    var rect = e.getBoundingClientRect();
    t_token = {
      x: (rect.left - map_rect.left) * (900 / map_rect.width),
      y: (rect.top - map_rect.top) * (900 / map_rect.height),
      picture: e.style.backgroundImage,
      size: e.style.height,
      stats: e.value,
      id: e.id,
    };

    output.ls_token.push(JSON.parse(JSON.stringify(t_token)));
    enemyId += 1;
  }
  enemyId += 1;

  downloadObjectAsJson(output, "saveFight");
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

  token.style.backgroundImage = info.picture;

  return token;
}
