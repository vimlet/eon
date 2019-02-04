var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static(path.join(__dirname, "release")));

// Doc server
var serverDoc = app.listen(8091, function() {
  var host = serverDoc.address().address;
  var port = serverDoc.address().port;
  console.log("Documentation server listening at http://localhost:" + port);
});
