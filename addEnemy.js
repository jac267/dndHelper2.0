enemyId = 0;
function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

image = "";

//Tous ce qui est par rapport aux bouton pour interagire avec la map a gauche
function getImageToken(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      image = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function addEnemys() {
  stats = {
    hitPoint: parseInt(document.getElementById("hitPointMod").value),
    str: parseInt(document.getElementById("StrMod").value),
    dex: parseInt(document.getElementById("DexMod").value),
    const: parseInt(document.getElementById("ConstMod").value),
    int: parseInt(document.getElementById("IntMod").value),
    wis: parseInt(document.getElementById("WisMod").value),
    cha: parseInt(document.getElementById("ChaMod").value),
    Init: parseInt(document.getElementById("InitMod").value),
  };
  for (
    let e = 0;
    e < parseInt(document.getElementById("NbMonster").value);
    e++
  ) {
    if (document.getElementById("PreIniMod").checked) {
      stats.Init = parseInt(document.getElementById("InitMod").value);
    } else {
      stats.Init =
        parseInt(document.getElementById("InitMod").value) + getRandomInt(20);
    }
    document.getElementById("map").appendChild(createToken(stats));
    $("#" + (enemyId - 1) + "Token").draggable();
    document.getElementById(enemyId - 1 + "Token").style.backgroundImage =
      "url(" + image + ")";
  }
}

function createToken(stats) {
  var token = document.createElement("div");
  token.id = enemyId + "Token";
  enemyId += 1;
  token.className = "token";
  token.onmouseover = () => overed(token);
  token.onmouseout = () => overed(null);
  token.value = JSON.parse(JSON.stringify(stats));
  token.textContent = stats.hitPoint;

  return token;
}

function resizeToken() {
  x = parseInt(document.getElementById("token-size").value);
  for (const e of document.getElementsByClassName("token")) {
    e.style.width = x + "px";
    e.style.height = x + "px";
    e.style.fontSize = x + "px";
  }
  return token;
}

over = null;

function overed(token) {
  over = token;
}
