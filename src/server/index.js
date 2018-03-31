var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var rest = require(path.join(__dirname, "../main/example/server/rest.js"));
var app = express();

app.use(express.static(path.join(__dirname, "../main")));

// Examples REST
rest.setup(app, bodyParser);

// Basic server
var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server listening at http://localhost:" + port);
});
