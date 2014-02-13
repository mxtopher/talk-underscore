var _ = require('./underscore');

var fib_a = function(n){
  return (n <= 2) ? 1 : (fib_a(n-1) + fib_a(n-2));
};

var fib_b = function(n){
  if (n <= 2) return 1;
  var old_guy;
  var normal_guy = 1;
  var new_guy    = 1;
  for(var j = 3; j <= n; j++){
    old_guy = normal_guy;
    normal_guy = new_guy;
    new_guy = old_guy + normal_guy; // calc new guy
  }
  return new_guy;
};

var fib_cache = [NaN, 1, 1]
var fib_c = function(n){
  if(fib_cache[n] !== undefined) return fib_cache[n]
  return fib_cache[n] = fib_c(n-1) + fib_c(n-2);
}

var win_memoize_use = _.memoize(function(n){
  return (n <= 2) ? 1 : (win_memoize_use(n-1) + win_memoize_use(n-2));
})

module.exports = {
  fib_a: fib_a
 ,fib_b: fib_b
 ,fib_c: fib_c
 ,win_memoize_use: win_memoize_use
};
