function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}
isShift = false;
document.body.onkeyup = function (e) {
  //soustraction
  if (e.keyCode == 37) {
    degat = parseInt(prompt("DEGATS"));

    if (Number.isInteger(degat)) {
      for (const e of document.getElementsByClassName("Selectionned")) {
        damage(e.id, degat);
      }
    }
  }

  //pour tour suivant
  nextSlidePlease(e);

  if (e.keyCode == 16) {
    isShift = false;
  }
};

document.body.onkeydown = function (e) {
  if (e.keyCode == 16) {
    isShift = true;
  }
};
function damage(id, damage) {
  document.getElementById(id).value.hitPoint =
    document.getElementById(id).value.hitPoint - damage;
  console.log(document.getElementById(id).value.hitPoint);
  document.getElementById(id).textContent =
    document.getElementById(id).value.hitPoint;
  isDead(id);
}

totalroll = 0;
function roll(nb) {
  totalroll += getRandomInt(nb);
  document.getElementById("resulte").textContent = totalroll;
}

function reset() {
  totalroll = 0;
  document.getElementById("resulte").textContent = totalroll;
}

function isDead(id) {
  if (document.getElementById(id).value.hitPoint <= 0) {
    document.getElementById(id).style.opacity = "0";
    document.getElementById(id).onclick = "";
    document.getElementById(id).value.Init = 0;
    document.getElementById(id).style.zIndex = -1000;
    document.getElementById(id).value.alive = false;
  }
}

document.getElementById("map").addEventListener("mousedown", updateSelection);

function updateSelection() {
  if (over == null) {
    for (const e of document.getElementsByClassName("Selectionned")) {
      e.className = e.className.replace(" Selectionned", "");
    }
    for (const e of document.getElementsByClassName("Selectionned")) {
      e.className = e.className.replace(" Selectionned", "");
    }
    for (const e of document.getElementsByClassName("Selectionned")) {
      e.className = e.className.replace(" Selectionned", "");
    }
  } else if (isShift) {
    if (!over.className.includes("Selectionned")) {
      over.className = over.className + " Selectionned";
    } else {
      over.className = over.className.replace(" Selectionned", "");
    }
  } else {
    if (!over.className.includes("Selectionned")) {
      for (const e of document.getElementsByClassName("Selectionned")) {
        e.className = e.className.replace(" Selectionned", "");
      }

      over.className = over.className + " Selectionned";
    } else {
      over.className = over.className.replace(" Selectionned", "");
    }
  }
  document.getElementById("mob-selected").textContent =
    "* " + document.getElementsByClassName("Selectionned").length;

  if (document.getElementsByClassName("Selectionned").length == 1) {
    document.getElementById("token-size").value = String(
      document.getElementsByClassName("Selectionned")[0].style.height
    ).replace("px", "");
  } else {
    document.getElementById("token-size").value = "";
  }
}

function DosaveThrow() {
  type = document.getElementById("dropbtn").textContent;
  typeToSlag = {
    Strength: "str",
    Dexterity: "dex",
    Constitution: "const",
    Intelligence: "int",
    Wisdom: "wis",
    Charisma: "cha",
  };

  if (type != "Saving Throw") {
    slag = typeToSlag[type];
    onFailledDamage = document.getElementById("damage-on-failed").value;
    onSuccesDamage = document.getElementById("damage-on-succes").value;
    difficulter = parseInt(prompt("difficulter"));

    if (Number.isInteger(difficulter)) {
      for (const e of document.getElementsByClassName("Selectionned")) {
        if (getRandomInt(20) + e.value[slag] >= difficulter) {
          damage(e.id, onSuccesDamage);
        } else {
          damage(e.id, onFailledDamage);
        }
      }
    }
  }
}

function nextSlidePlease(e) {
  if (e.keyCode == 39) {
    tracker = document.getElementById("initiativeTrackerTEXTE");

    tour = tracker.textContent;

    if (tour == "P") {
      max = 0;
      for (const e of document.getElementsByClassName("token")) {
        if (max < parseInt(e.value.Init)) {
          max = parseInt(e.value.Init);
        }
      }

      value = max;
    } else if (parseInt(tour) - 1 == -1) {
      value = "P";
    } else {
      max = 0;
      for (const e of document.getElementsByClassName("token")) {
        if (
          max < parseInt(e.value.Init) &&
          parseInt(e.value.Init) < parseInt(tour)
        ) {
          max = parseInt(e.value.Init);
        }
      }
      value = max;
    }
    document.getElementById("initiativeTrackerTEXTE").textContent = value;

    clearCurrentTurn();
    clearCurrentTurn();
    clearCurrentTurn();
    for (const e of document.getElementsByClassName("token")) {
      if (e.value.Init == value) {
        currentTurn(e);
      }
    }
  }
}
function currentTurn(token) {
  token.className = token.className + " currentTurn";
}

function clearCurrentTurn() {
  for (const e of document.getElementsByClassName("token")) {
    e.className = e.className.replace(" currentTurn", "");
  }
}

setInterval(save, 100);

function save() {
  if (document.getElementById("admin").checked) {
    GetMouvementCommand();

    window.post = function (url, data) {
      return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    };

    // ...

    ls_token = [];

    map_rect = document.getElementById("map").getBoundingClientRect();
    for (const e of document.getElementsByClassName("token")) {
      var rect = e.getBoundingClientRect();

      outputs = {
        x: (rect.left - map_rect.left) * (900 / map_rect.width),
        y: (rect.top - map_rect.top) * (900 / map_rect.height),
        picture: e.style.backgroundImage,
        size: e.style.height,
        stats: e.value,
        id: e.id,
      };
      ls_token.push(JSON.parse(JSON.stringify(outputs)));
    }
    save_ = {
      map: document.getElementById("map-canvas").src,
      ls_token,
      currentTurn: document.getElementById("initiativeTrackerTEXTE")
        .textContent,
    };

    let response = post("http://10.0.0.42:8080/", save_);
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
function smallReload() {
  if (touched) {
    lastmovedTimeStamp = Date.now();
  }
  document.getElementById("savedMapping").remove();
  var script = document.createElement("script");
  script.src = "mapping";
  script.id = "savedMapping";
  document.body.appendChild(script);

  mapCanvas = document.getElementById("map-canvas");
  mapCanvas.src = mappingDict.map;
  if (lastmovedTimeStamp + 500 < Date.now()) {
    document.getElementById("map").innerHTML = "";
  }

  if (mappingDict.currentTurn == caracter.init && !hasPlayedThisRound) {
    hasPlayedThisRound = true;
    if (caracter.init != "") {
      alert("À toi de jouer!");
    }
  } else if (mappingDict.currentTurn != caracter.init) {
    hasPlayedThisRound = false;
  }
  for (const e of mappingDict.ls_token) {
    if (lastmovedTimeStamp + 500 < Date.now()) {
      if (e.stats.alive) {
        document
          .getElementById("map")
          .appendChild(createToken2(e.x, e.y, e.picture, e.size, e.id));
      }
    }
  }

  generateCaracterList(mappingDict.ls_token);
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
    lastmovedTimeStamp = Date.now();
  } else {
    token.style.top = y + "px";
    token.style.left = x + "px";
  }

  token.style.height = height;
  token.style.width = height;
  token.style.backgroundImage = picture;
  if (token.id == caracter.id) {
    token.ontouchstart = () => {
      touched = true;
    };
    token.ontouchmove = (e) => moveit(e);
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

function beOrUnbeAdmin() {
  for (const e of document.getElementsByClassName("token")) {
    e.remove();
  }
  for (const e of document.getElementsByClassName("token")) {
    e.remove();
  }
  for (const e of document.getElementsByClassName("token")) {
    e.remove();
  }
}

mylatesttap = 0;
wantedPlace = { x: 0, y: 0 };
lastmovedTimeStamp = 0;
function moveit(e) {
  var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
  var touch = evt.touches[0] || evt.changedTouches[0];
  wantedPlace.x = touch.pageX;
  wantedPlace.y = touch.pageY;
  mytoken = document.getElementById(caracter.id);

  mytoken.style.left =
    wantedPlace.x - parseInt(mytoken.style.width.replace("px", "")) / 2 + "px";
  mytoken.style.top =
    wantedPlace.y - parseInt(mytoken.style.height.replace("px", "")) / 2 + "px";
  lastmovedTimeStamp = Date.now();
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

touched = false;
