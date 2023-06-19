var express = require("express");
var app = express();
const fs = require("fs");
app.use(express.json({ limit: "50mb" }));

mapping = {};

app.use(express.static(__dirname));
app.get("/mapping", function (req, res) {
  res.send("mappingDict = " + JSON.stringify(mapping));
});
app.post("/", function (request, response) {
  mapping = request.body;

  response.send(request.body); // echo the result back
});

// so l'ip pour se conecter : 10.0.0.42:8080
app.listen(8080);
