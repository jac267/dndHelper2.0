var express = require("express");
var app = express();
const fs = require("fs");
app.use(express.json({ limit: "50mb" }));

mapping = {};
mouvement = [];

tokenImg = {};
mapImg = "";
lastImgChange = 0;

app.use(express.static(__dirname));
app.get("/UpdatedLogs", function (req, res) {
  mapping["lastImgChange"] = lastImgChange;
  res.send("UpdatedLogsDict = " + JSON.stringify(mapping));
});

app.get("/mouvementUpdate", function (req, res) {
  res.send("ls_mouvement = " + JSON.stringify(mouvement));
});

app.get("/visualComponent", function (req, res) {
  res.send(
    "visualComponent = " +
      JSON.stringify({ mapIMG: mapImg, TokensIMG: tokenImg })
  );
});

app.post("/tokenImg", function (request, response) {
  key = request.body.key;
  value = request.body.value;
  tokenImg[key] = value;

  lastImgChange = Date.now();
  response.send(request.body); // echo the result back
});

app.post("/mapImg", function (request, response) {
  mapImg = request.body.value;

  lastImgChange = Date.now();
  response.send(request.body); // echo the result back
});

app.post("/update", function (request, response) {
  mapping = request.body;

  response.send(request.body); // echo the result back
});
app.get("/mouvementUpdate", function (req, res) {
  res.send("ls_mouvement = " + JSON.stringify(mouvement));
});

app.post("/move", function (request, response) {
  mouvement.push({
    id: request.body.id,
    x: request.body.x,
    y: request.body.y,
    trasactionId: String(Date.now()) + request.body.id,
  });

  response.send(request.body); // echo the result back
});

app.post("/moveReceive", function (request, response) {
  for (const e of mouvement) {
    for (const id of request.body.toRemove) {
      if (e.trasactionId == id) {
        index = mouvement.indexOf(e);
        mouvement.splice(index, 1);
      }
    }
  }

  response.send(request.body); // echo the result back
});

// so l'ip pour se conecter : 10.0.0.42:8080
app.listen(8080);
