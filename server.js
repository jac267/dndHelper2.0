var express = require("express");
var app = express();
const fs = require("fs");
app.use(express.json({ limit: "50mb" }));

mapping = {};
mouvement = [];
app.use(express.static(__dirname));
app.get("/mapping", function (req, res) {
  res.send("mappingDict = " + JSON.stringify(mapping));
});
app.post("/", function (request, response) {
  mapping = request.body;

  response.send({ message: "No bitches Found" }); // echo the result back
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
