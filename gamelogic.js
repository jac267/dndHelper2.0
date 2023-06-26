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

window.post = function (url, data) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

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

function moveit(e, timedCall) {
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

touched = false;
