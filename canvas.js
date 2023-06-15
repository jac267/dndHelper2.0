zHold = false;

addEventListener("wheel", (event) => {
  // the user has to hold z to zoom in zoom out
  if (zHold) {
    //zoom
    if (event.deltaY == -100) {
      canvas = document.getElementById("mapCanvas");

      canvas.style.width = canvas.offsetWidth + canvas.offsetWidth / 10 + "px";
      canvas.style.height =
        canvas.offsetHeight + canvas.offsetHeight / 10 + "px";
      //dezoom
    } else if (event.deltaY == 100) {
      canvas = document.getElementById("mapCanvas");

      canvas.style.width = canvas.offsetWidth - canvas.offsetWidth / 10 + "px";
      canvas.style.height =
        canvas.offsetHeight - canvas.offsetHeight / 10 + "px";
    }
  }
});

document.body.onkeydown = function (e) {
  if (e.keyCode == 90) {
    zHold = true;
    document.body.style.cursor = "zoom-in";
  }
};

document.body.onkeyup = function (e) {
  if (e.keyCode == 90) {
    zHold = false;
    document.body.style.cursor = "auto";
  }
};
