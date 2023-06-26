enemyId = 0;
function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

image = "";

const MAX_WIDTH = 100;
const MAX_HEIGHT = 100;

const INPUT = document.getElementById("input-Monster");

INPUT.onchange = function (event) {
  const file = event.target.files[0]; // get the file
  const blobURL = URL.createObjectURL(file);

  const img = new Image();
  img.src = blobURL;

  img.onload = function () {
    var fileReader = new FileReader();
    fileReader.onload = function (event) {
      image = event.target.result;
    };

    const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
    const canvas2 = document.createElement("canvas");
    canvas2.width = newWidth;
    canvas2.height = newHeight;
    const ctx = canvas2.getContext("2d");
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    canvas2.toBlob((blob) => {
      fileReader.readAsArrayBuffer(blob);
    });
  };
};

function calculateSize(img, maxWidth, maxHeight) {
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
}

function readableBytes(bytes) {
  const i = Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}

//Tous ce qui est par rapport aux bouton pour interagire avec la map a gauche
function getImageToken(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      const file = e.target.file;
      const blobURL = window.URL.createObjectURL(file);
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
    alive: true,
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
    document.getElementById(enemyId - 1 + "Token").style.backgroundImage =
      "url(" + URL.createObjectURL(new Blob([image])) + ")";

    TheNewToken = {
      key: enemyId - 1 + "Token",
      value: JSON.parse(JSON.stringify(new Uint8Array(image))),
    };

    post("http://10.0.0.42:8080/tokenImg", TheNewToken);
  }
}
document.onmouseup = () => stopMoving();

function createToken(stats) {
  var token = document.createElement("div");
  token.id = enemyId + "Token";
  enemyId += 1;
  token.className = "token";
  token.style.height = 25 + "px";
  token.style.width = 25 + "px";
  token.onmouseover = () => overed(token);
  token.onmouseout = () => overed(null);
  token.draggable = true;
  token.onmousedown = () => moveTokenWithMouse(token.id);

  token.value = JSON.parse(JSON.stringify(stats));
  token.textContent = stats.hitPoint;

  return token;
}

function resizeToken() {
  x = parseInt(document.getElementById("token-size").value);
  if (x == -1 || x == 1) {
    for (const e of document.getElementsByClassName("Selectionned")) {
      e.style.width =
        parseInt(String(e.style.width).replace("px", "")) + x + "px";
      e.style.height =
        parseInt(String(e.style.width).replace("px", "")) + x + "px";
      e.style.fontSize =
        parseInt(String(e.style.width).replace("px", "")) + x + "px";
    }
    document.getElementById("token-size").value = "";
  } else {
    for (const e of document.getElementsByClassName("Selectionned")) {
      e.style.width = x + "px";
      e.style.height = x + "px";
      e.style.fontSize = x + "px";
    }
  }

  return token;
}

over = null;

function overed(token) {
  over = token;
}
