var express = require("express");
var app = express();

app.use(express.static(__dirname));
app.get("/", function (req, res) {
  res.sendFile("/index.html", { root: __dirname });
});

// so l'ip pour se conecter : 10.0.0.42:8080
app.listen(8080);
