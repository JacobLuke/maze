



// Returns a number in [lo, hi)
// Because it would be silly for this to be built-in
function randInRange(lo, hi) {
 if (hi === undefined) {
   hi = lo;
   lo = 0;
 }
 return parseInt(Math.random() * (hi - lo)) + lo;
}
// Stupid utility functions are stupid
function swap (arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Knuth's algorithm to randomly permute an array
function shuffle (arr) {
  if (arr.length < 2 ) return;
  for ( var i = 1; i < arr.length; ++i) {
    var j = randInRange(i);
    swap(arr, i, j);
  }
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

module.exports.randInRange = randInRange;
module.exports.swap = swap;
module.exports.shuffle = shuffle;