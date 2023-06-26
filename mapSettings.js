//Tous ce qui est par rapport aux bouton pour interagire avec la map a gauche
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      mapCanvas = document.getElementById("map-canvas");
      mapCanvas.src = e.target.result;
      TheNewCanvasSrc = { value: e.target.result };
      post("http://10.0.0.42:8080/mapImg", TheNewCanvasSrc);
    };

    reader.readAsDataURL(input.files[0]);
  }
}
