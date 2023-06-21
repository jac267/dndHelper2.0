mouseHeld = false;
start = { x: 0, y: 0 };
origine = { x: 0, y: 0 };
inititialeCallId = "";
function moveTokenWithMouse(id) {
  first = document.getElementById(id);
  var rect = first.getBoundingClientRect();
  origine.x = rect.left;
  origine.y = rect.top;
  inititialeCallId = id;
  var e = window.event;

  start.x = e.clientX;
  start.y = e.clientY;
  //trouver le mouvement a faire
  mouseHeld = true;
}

function stopMoving() {
  mouseHeld = false;
}

function move() {
  if (mouseHeld) {
    map_rect = document.getElementById("map").getBoundingClientRect();

    a = { x: 0, y: 0 };
    a2 = { x: 0, y: 0 };
    var e = window.event;

    a.x = e.clientX - start.x;
    a.y = e.clientY - start.y;
    first = document.getElementById(inititialeCallId);

    frect1 = first.getBoundingClientRect();

    first.style.left =
      (origine.x - map_rect.left + a.x) * (900 / map_rect.width) + "px";
    first.style.top =
      (origine.y - map_rect.top + a.y) * (900 / map_rect.height) + "px";

    frect2 = first.getBoundingClientRect();
    a2.x = frect2.left - frect1.left;
    a2.y = frect2.top - frect1.top;
    for (const e of document.getElementsByClassName("Selectionned")) {
      if (e.id != inititialeCallId) {
        var rect = e.getBoundingClientRect();

        e.style.left =
          (rect.left - map_rect.left + a2.x) * (900 / map_rect.width) + "px";
        e.style.top =
          (rect.top - map_rect.top + a2.y) * (900 / map_rect.height) + "px";
      }
    }
  }
}

document.onmousemove = () => move();
