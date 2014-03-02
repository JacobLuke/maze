jQuery(function($){
  $.get("maze", loadMaze);
});
function loadMaze(maze) {
  console.log(maze);
  var canvas = $("#mazeCanvas");
  var ctx = canvas[0].getContext("2d");
  ctx.beginPath()
  var width = canvas.width() / maze.n;
  var height = canvas.height() / maze.m;
  for (var i = 0; i < maze.walls.length; ++i) {
    var wall = maze.walls[i];
    var x = wall.second % maze.n;
    var y = parseInt(wall.second / maze.n);
    ctx.moveTo(x * width, y * height);
    if (wall.first === wall.second - 1) { // Vertical Wall
      ctx.lineTo(x * width, (y + 1) * height);
    } else { //Horizontal wall 
      ctx.lineTo((x + 1) * width, y * height);
    }
  }
  ctx.moveTo(width,0);
  ctx.lineTo(maze.n * width, 0);
  ctx.lineTo(maze.n * width, (maze.m - 1) * height);
  ctx.moveTo((maze.n - 1) * width, maze.m * height);
  ctx.lineTo(0, maze.m * height);
  ctx.lineTo(0, height);
  ctx.stroke();
  
  state = {px: null, py:null};
  $.socket = io.connect();
  $.socket.on("move", function() { drawState(ctx, width, height, state) }, 30);
  $(document).on("keyup", sendKey);
}


function drawState(ctx, w, h, prev) {
$.get("state", function(data) {
    // Clear last pointer
    if (prev.px !== null) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc((prev.px + .5) * w, (prev.py + .5) * h, w / 2.4, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc((data.px + .5) * w, (data.py + .5) * h, w / 2.5, 0, 2 * Math.PI);
    ctx.fill();
    prev.px = data.px;
    prev.py = data.py;
  });
}

function sendKey(e) {
  console.log(e);
  var key = {37:"left", 38:"up", 39:"right", 40:"down"}[e.which];
  if (key) {
    console.log("does this?");
    $.socket.emit("key", {val:key})
  }
  return false;
}