var _ = require('./underscore');
var second_is_no_smaller_than_first = function(first, second) {
  return second >= first;
};
var second_is_smaller_than_first = function(first, second) {
  return second < first;
};

var quick_sort = function(stuff) {
  if(stuff.length <= 1) return stuff; //Boring part

  // these are values
  var head = _.head(stuff);
  var tail = _.tail(stuff);

  // these are functions
  var smaller_than_head =
    _.partial(second_is_smaller_than_first, [head]);

  var no_smaller_than_head =
    _.partial(second_is_no_smaller_than_first, [head]);

  // this is magic:

  return (
           // the guys before pivot, sorted
           quick_sort(_.select(tail, smaller_than_head)).     
           // the pivot
           concat([head]).
           // the guys after pivot, sorted
           concat(quick_sort(_.select(tail, no_smaller_than_head)))
         );
};

module.exports = quick_sort;
