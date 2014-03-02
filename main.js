var app = require("express")();
var http = require("http");
var url = require("url");
var fs = require("fs");

var maze = require("./server/maze")

var _maze = null;

var pointer = {px:0, py:0};

var server = http.createServer(app);
server.listen(9000);
var io = require("socket.io").listen(server);

app.get("/", function(req, res) {
  res.sendfile(__dirname + "/html/index.html");
});

app.get("/maze", function(req, res) {
  if (_maze === null) {
    _maze = new maze.maze(50, 100);
  }
  res.json(_maze);
});

app.get("/state", function(req, res) {
  res.json(pointer);
});

app.use(function (req, res) {
  if (req.path.endsWith(".js")) {
    res.sendfile(__dirname + "/client" + req.path);
  }
});

io.sockets.on("connection", function(socket) {
  socket.on("key", function(data) {
    if (_maze) {
      _maze.move(pointer, data.val);
    }
    socket.emit("move");
  });
  socket.emit("move");
});