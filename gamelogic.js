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

setInterval(save, 500);

function save() {
  if (document.getElementById("admin").checked) {
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
        stats: e.stats,
        picture: e.style.backgroundImage,
        size: e.style.height,
        stats: e.value,
      };
      ls_token.push(JSON.parse(JSON.stringify(outputs)));
    }
    save_ = { map: document.getElementById("map-canvas").src, ls_token };
    post("http://10.0.0.42:8080/", save_);
  } else {
    smallReload();
  }
}

aaa = 1;
function smallReload() {
  document.getElementById("savedMapping").remove();
  var script = document.createElement("script");
  script.src = "mapping";
  script.id = "savedMapping";
  document.body.appendChild(script);

  console.log(mappingDict);
  mapCanvas = document.getElementById("map-canvas");
  mapCanvas.src = mappingDict.map;

  document.getElementById("map").innerHTML = "";
  for (const e of mappingDict.ls_token) {
    console.log(e.stats);
    if (e.stats.alive) {
      document
        .getElementById("map")
        .appendChild(createToken2(e.x, e.y, e.picture, e.size));
    }
  }
  if (aaa == 1) {
    generateCaracterList(mappingDict.ls_token);
    aaa = 2;
  }
}

function createToken2(x, y, picture, height) {
  var token = document.createElement("div");
  token.className = "token";

  token.style.top = y + "px";
  token.style.left = x + "px";
  token.style.height = height;
  token.style.width = height;
  token.style.backgroundImage = picture;

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
