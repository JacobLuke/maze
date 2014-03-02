
ufind = require("./ufind");
util = require("./util");

//The actual core data structure holding the randomly-generated maze
maze = function(m, n) {
  this.n = n;
  this.m = m;
    //This is based on the randomized version of Kruskall's algorithm
    //See the wiki article on Maze Generation for more info
  
  squareUfind = new ufind.ufind(m * n);
  
  var walls = [];
  for (var i = 0; i < m; ++i) {
    for (var j = 0; j < n; ++j) {
      if (i < m - 1) {
        walls.push({
          first:i * n + j, 
          second:(i + 1) * n + j
        });
      }
      if (j < n - 1) {
        walls.push({
          first: i * n + j,
          second:i * n + j + 1
        });
      }
    }
  }
  
   // Process walls in random order
   util.shuffle(walls);
   
   for(var i = 0; i < walls.length; ++i) {
    var wall = walls[i];
    //If both are already on the same path, don't remove the wall
    if (squareUfind.find(wall.first) === squareUfind.find(wall.second)) continue;
    
    // Union the two cells
    squareUfind.union(wall.first, wall.second);
    
    // Remove the wall
    walls[i] = null;      
  }
  this.walls = []
  this.blocked = {}
  for (var i = 0; i < walls.length; ++i) {
    var wall = walls[i]
    if (wall !== null) {
      this.walls.push(wall)
      if (!this.blocked[wall.first]) {
        this.blocked[wall.first] = {}
      }
      this.blocked[wall.first][wall.second] = true;
    }
  }
}

maze.prototype.move = function (coord, direction) {
  var cur = coord.py * this.n + coord.px;
  var next;
  if (direction === "up" && cur >= this.n) {
    next = cur - this.n;
  } else if (direction === "down" && cur < (this.m - 1) * this.n) {
    next = cur + this.n;
  } else if (direction === "left" && cur % this.n > 0) {
    next = cur - 1;
  } else if (direction === "right" && cur % this.n < this.n - 1) {
    next = cur + 1;
  } else {
    return;
  }
  if ((this.blocked[next] && this.blocked[next][cur]) || (this.blocked[cur] && this.blocked[cur][next])) {
    return;
  }
  coord.px = next % this.n;
  coord.py = parseInt(next / this.n);
}


module.exports.maze = maze