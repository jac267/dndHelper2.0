setInterval(save, 100);

lastImgChange = -1;

function save() {
  if (document.getElementById("admin").checked) {
    GetMouvementCommand();

    ls_token = [];

    map_rect = document.getElementById("map").getBoundingClientRect();
    for (const e of document.getElementsByClassName("token")) {
      var rect = e.getBoundingClientRect();

      outputs = {
        x: (rect.left - map_rect.left) * (900 / map_rect.width),
        y: (rect.top - map_rect.top) * (900 / map_rect.height),
        size: e.style.height,
        stats: e.value,
        id: e.id,
      };
      ls_token.push(JSON.parse(JSON.stringify(outputs)));
    }
    save_ = {
      ls_token,
      currentTurn: document.getElementById("initiativeTrackerTEXTE")
        .textContent,
    };

    let response = post("http://10.0.0.42:8080/update", save_);
  } else {
    smallReload();
  }
}

function GetMouvementCommand() {
  document.getElementById("mouvementUpdate").remove();
  var script = document.createElement("script");
  script.src = "mouvementUpdate";
  script.id = "mouvementUpdate";
  document.body.appendChild(script);

  ls_transationId = [];
  for (const e of ls_mouvement) {
    eToken = document.getElementById(e.id);
    eToken.style.left = e.x + "px";
    eToken.style.top = e.y + "px";
    ls_transationId.push(e.trasactionId);
  }
  terminateTransaction(ls_transationId);
}

function terminateTransaction(ls_transationId) {
  window.post = function (url, data) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };
  post("http://10.0.0.42:8080/moveReceive", { toRemove: ls_transationId });
}

hasPlayedThisRound = false;
tokenImg = {};
newStuff = false;

function smallReload() {
  if (touched) {
    lastmovedTimeStamp = Date.now();
  }
  if (lastmovedTimeStamp < Date.now()) {
    askTheServerWhatsNew("UpdatedLogs", "UpdatedLogs");

    // il y a trois element a faire checker si les images on changer

    if (UpdatedLogsDict.lastImgChange != lastImgChange) {
      newStuff = true;
      //update le temps
      lastImgChange = UpdatedLogsDict.lastImgChange;

      askTheServerWhatsNew("visualComponent", "visualComponent");

      //change la carte
      mapCanvas = document.getElementById("map-canvas");

      //change tous les token
    } else if (newStuff) {
      newStuff = false;
      mapCanvas.src = visualComponent.mapIMG;
      for (let key in visualComponent.TokensIMG) {
        tokenImg[key] = URL.createObjectURL(
          new Blob(
            [new Uint8Array(Object.values(visualComponent.TokensIMG[key]))],
            { type: "image/png" } /* (1) */
          )
        );
      }
    }

    document.getElementById("map").innerHTML = "";

    if (UpdatedLogsDict.currentTurn == caracter.init && !hasPlayedThisRound) {
      hasPlayedThisRound = true;
      if (caracter.init != "") {
        alert("À toi de jouer!");
      }
    } else if (UpdatedLogsDict.currentTurn != caracter.init) {
      hasPlayedThisRound = false;
    }

    for (const e of UpdatedLogsDict.ls_token) {
      if (e.stats.alive) {
        document
          .getElementById("map")
          .appendChild(createToken2(e.x, e.y, tokenImg[e.id], e.size, e.id));
      }
    }

    if (caracter.id == "") {
      generateCaracterList(UpdatedLogsDict.ls_token);
    }
  }
}

function askTheServerWhatsNew(ids, srce) {
  document.getElementById(ids).remove();
  var script = document.createElement("script");
  script.src = srce;
  script.id = ids;
  document.body.appendChild(script);
}
function createToken2(x, y, picture, height, id) {
  var token = document.createElement("div");
  if (id == caracter.id) {
    token.className = "token currentTurn";
  } else {
    token.className = "token";
  }

  token.id = id;

  if (token.id == caracter.id && lastmovedTimeStamp + 500 > Date.now()) {
    token.style.left =
      wantedPlace.x -
      parseInt(mytoken.style.width.replace("px", "")) / 2 +
      "px";
    token.style.top =
      wantedPlace.y -
      parseInt(mytoken.style.height.replace("px", "")) / 2 +
      "px";
  } else {
    token.style.top = y + "px";
    token.style.left = x + "px";
  }

  token.style.height = height;
  token.style.width = height;
  token.style.backgroundImage = "url(" + picture + ")";
  if (token.id == caracter.id) {
    token.ontouchstart = () => {
      touched = true;
    };
    token.ontouchmove = (e) => moveit(e, Date.now());
    token.ontouchend = (e) => {
      touched = false;
      moveMyCaracter(wantedPlace.x, wantedPlace.y);
    };
  }

  return token;
}

function hideOrShowHp() {
  if (document.getElementById("show-hp-bar").checked) {
    for (const e of document.getElementsByClassName("token")) {
      e.style.color = "rgb(0,0,0)";
    }
  } else {
    for (const e of document.getElementsByClassName("token")) {
      e.style.color = "rgba(0,0,0,0)";
    }
  }
}

function moveMyCaracter(x, y) {
  window.post = function (url, data) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  // ...

  mytoken = document.getElementById(caracter.id);
  map_rect = document.getElementById("map").getBoundingClientRect();

  var rect = mytoken.getBoundingClientRect();

  absolute_y = y - parseInt(mytoken.style.height.replace("px", "")) / 2;
  save_ = {
    id: caracter.id,
    x:
      x * (900 / map_rect.width) -
      parseInt(mytoken.style.width.replace("px", "")) / 2,
    y:
      y * (900 / map_rect.height) -
      parseInt(mytoken.style.height.replace("px", "")) / 2,
  };

  let response = post("http://10.0.0.42:8080/move", save_);
}
