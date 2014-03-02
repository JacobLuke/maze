// A simple Union-find implementation
// Useful for maze-building
ufind = function(n) {
  this.nodes = {};
  for (var i = 0; i < n; ++i) {
    this.nodes[i] = {
      parent: i,
      rank: 0
    };
  }
};
ufind.prototype.find = function(x) {
  if(this.nodes[x].parent !== x) {
    this.nodes[x].parent = this.find(this.nodes[x].parent);
  }
  return this.nodes[x].parent;
};
ufind.prototype.union = function(x, y) {
  var xr = this.find(x);
  var yr = this.find(y);
  if (xr === yr) return;
    
  if (this.nodes[xr].rank > this.nodes[yr].rank) {
    this.nodes[yr].parent = xr;
  } else if (this.nodes[xr].rank < this.nodes[yr].rank) {
    this.nodes[xr].parent = yr;
  } else {
    this.nodes[yr].parent = xr;
    this.nodes[xr].rank += 1;
  }
};
module.exports.ufind = ufind;