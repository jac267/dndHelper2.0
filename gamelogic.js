function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

document.body.onkeyup = function (e) {
  //soustraction
  if (e.keyCode == 37) {
    degat = parseInt(prompt("DEGATS"));

    if (Number.isInteger(degat)) {
    }
  }
  document.getElementById("result").textContent = totalroll;
};

function damage(id, damage) {
  document.getElementById(id).value.hitPoint - damage;
  document.getElementById(id).textContent =
    document.getElementById(id).value.hitPoint;
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

function getSelectionned() {
  for (let e : )
}
