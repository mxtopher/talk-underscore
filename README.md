## Functional Programming using Underscore

Cristopher Moreira da Silva   @ [Avenue Code](http://www.avenuecode.com)

csilva@avenuecode.com 

Feb 13th, 2014

---

## Agenda

- First Impressions
  - Quick quick sort
  - Smart fibonacci

- Why would I use it?

- Functional Programming in a nutshell

----

## Agenda

- Functional Programming with Underscore
  - Diping our toes
  - Collection manipulation
  - Object manipulation
  - Function manipulation
  - Bonus!!!

- References

- Challenges

---

## Prerequisites

- Intermediate Javascript level
- Open Mind (:

---

## First Impressions

- How can I implement quick sort?
  - The Old way
    - Do anyone remeber? Yeah, curse you partition...
  - I have a better idea

----

## Underscore Legible Implementation

```javascript
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
```

---

## Nice! I liked these weird methods!

- What else can I do with them?
  - How can I implement Fibonacci?
- The "I know functions!" way

```javascript
var fib_a = function(n){
  return (n <= 2) ? 1 : (fib_a(n-1) + fib_a(n-2));
};
```

----

- The "I can loop too!" way

```javascript
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
```

----

- The "GOTTA CATCH'EM ALL" way (a.k.a memoization)

```javascript
var fib_cache = [NaN, 1, 1]
var fib_c = function(n){
  if(fib_cache[n] !== undefined) return fib_cache[n]
  return fib_cache[n] = fib_c(n-1) + fib_c(n-2);
}
```

- The "Today I don't feel like doing anything" way

```javascript
// WIN WIN!
var win_memoize_use = _.memoize(function(n){
  return (n <= 2) ? 1 : (win_memoize_use(n-1) + win_memoize_use(n-2));
})
```

---

## Awesome. But just why.

- Why would I want to use underscore to solve the problems _ I already solve _ ?
  - Because it is awesome (:
  - If you are using Backbone, you already have it. No more deps.
  - It is modular and does not mess with any object prototype.
  - Functional Programming has very powerful concepts that can be useful.

---

## Functional Programming in a nutshell

- Build your code around functions (verbs), instead of classes/objects (nouns)
- Abuse of higher order functions. Abuse of function returning and/or manipulation. Avoid values manipulation(!)

----

## Functional Programming in a nutshell

- You don't want to handle state. You don't want to worry about the time dimension.
  - What is the state of this object WHEN I call this method?
  - Should I call this method BEFORE OR AFTER this one?
  - Is it SAFE to call this method twice?
  - Is it safe to use this var after I passed it as a parameter to that weird function?

----

## Functional Programming in a nutshell

- Avoid side effects: use pure functions
  - You know that function that calculates the result, sets it in that property,
    triggers that event that will be grabbed by (who? I don't remember) someone,
    logs it and does a ajax to update the state on the server??? We all know.
  - I dare you to call it twice.
  - I double dare you to refactor it.
  - I triple dare you to unit test it!!!

----

## Functional Programming in a nutshell

- Don't think about 'how to achieve the result'. Think about 'how is the result defined'
  - Think about relations, not steps.
  - It is sometimes called declarative programming. In oposition to imperative programming

---

## Enemies of functional programming:
- Conventional assignment, mutable variables.
- Step definitions. Like do this, then do that, and if this then do that too.

----

## WHAT? NO ASSIGNMENTS, NO VARIABLES, NO ALGORITHMS?
- Assigning new values to variables is keeping state. Keeping state is creating side effects AND messing with the TIME variable.
- imperative algorithms are exactly the opposite of what functional programming says.

----

## So, what do you suggest?
  - Create functions. Combine functions. Return functions.
  - Return values. Don't set them.
  - Try to set the value of a var only in it initialization (as a const.)

----

## It forces me to create a lot of small functions!!
  - Yes. Javascrit has function scope. Small functions are basically enforced by definition (:
  - Yes. Well defined, easy testable, IDEMPOTENT, no-side-effects-attached pretty boring functions.

---

## You didn't convince me. I want examples.
- Let's go back to Underscore!

----

## Underscore
- Functions for collection manipulation
- Functions for Array  manipulation
- Functions for Object manipulation
- Functions for function manipulation
- Bonus!

----

## Lets dip our toes
- _.times
  - FOR no more!

```javascript
(function(){
  // I am creating a var for the loop here
  for(var i = 0; i < 10; i++){
    var a, b, c; // I am creating vars that I only use here.
    //... Code follows 
  }

  // I can't create it again, we all know
  for(i = 0; i < 8; i++){
    // a, b and c are poluting here.
  }

  // And I can't get rid of them!!!
  // ...
})();
```

----

```javascript
// First step: create inner functions
(function(){
  var do_weird_stuff_with = function(i){/*...*/};
  var do_other_stuff_with_other = function(i){/*...*/};
  // I am creating a var for the loop here
  for(var i = 0; i < 10; i++){
    do_weird_stuff_with(i);
  }

  // I can't create it again, we all know
  for(i = 0; i < 8; i++){
    do_other_stuff_with_other(i);
  }

  // Now only i polutes my namespace here
  // ...
})();
```

----

```javascript
// Times comes to save the day!
(function(){
  _.times(10, function(i){
    do_weird_stuff_with(i);
  });

  _(8).times(function(i){
    do_other_stuff_with_other(i);
  });

  // No side effects, no state manipulation, no var at all!
})()
```

- No much gain, ok. But we are getting the point.

---

## The might map

- Maps a function in a collection, returns a collection
- Indeed aliased as _collect_

```javascript
// Get the name, hp and number of types of all pokemons;
var some_info = _(pokemons).map(function(pokemon){
  return {name  : pokemon.name,
          hp    : pokemon.stats.hp,
          types : pokemon.type.length
  };
});

// Get the male/female ratio for all pokemon
var pokemons_with_sex = _(pokemons).filter(function(pokemon){
  return !!pokemon.misc && !!pokemon.misc.sex &&
         !!pokemon.misc.sex.male && !!pokemon.misc.sex.female;
});
var ratio = _(pokemons_with_sex).map(function(pokemon){
  var sex = pokemon.misc.sex;
  return {name: pokemon.name, ratio: sex.male / sex.female};
});

```

----
## Map cousin:

- _.pluck

```javascript
// Get only name of all pokemons
var pokenames = _(pokemons).pluck('name');
```

---

## Filter: Guess what it does

- Alias: select

```javascript
// Get all pokemons with hp higher than 70
var beefy_pokemons = _(pokemons).filter(function(pokemon){
  return pokemon.stats.hp > 70;
});

// Get all fire pokemons
var fire_pokemons = _(pokemons).filter(function(pokemon){
  return _(pokemon.type).include('fire');
});
```

----

## Filter cousins

- _.where

```javascript
// Filter objects by an example
// Get all pokemons called Baubasaur
var no_misc_pokemons = _(pokemons).where({ name: 'Baubasaur' });

// Get all pokemons with types ice and water
// doesn't work: Compares with ===, so only works for basic times
var no_misc_pokemons = _(pokemons).where({ type: ['Ice', 'Water'] });
```

- _.find, alias detect
  - Returns only the first matching element

- _.reject
  - Inverse of filter

----

## Filter cousins

- _.partition
  - returns two arrays: The elements that satisfy in one and the elements that doesn't satisfy in other (works only for arrays)
- _.without
  - returns an array without the elements passed as parameters
- _.compact
  - removes all _falsy_ values from array

---

## Reduce: Fold all the values to a single one

- Indeed, fold _is_ one alias for reduce

```javascript
// Summing all values in an array:
_.reduce([1,2,3,4,5], function(a, b){return a + b});
// The most lazy implementation of factorial in the world
var fac = function(n){
  _.reduce(_.tail(_.range(n+1)), function(a, b){return a * b});
}
// Getting the average hp of the water pokemons
var water_pokemons = _.filter(pokemons, function(pokemon){
  return _(pokemon.type).include('Water');
});
var one_more_pokemon_hp_to_the_sum = function(sum, pokemon){
  return sum + pokemon.stats.hp;
};
var average = _.reduce(water_pokemons, one_more_pokemon_hp_to_the_sum, 0)/
              water_pokemons.size();
})
```

----

## Reduce details

- _.reduce(collection, function(memo, next_el){...}, start_value)
  - reducer function must receive an aggregating memo and the next element.
  - Reduce may have a start value for memo. If not passed, the starting value will be the collection's head.
  - Reducer function may receive up to four arguments:
    - function(memo, element, iteration_index, entire_collection)

----

## Reduce cousins

- _.every, alias all
 - naive implementation:

```javascript
_.every = function(collection, predicate){
  return _.reduce(_.map(collection, predicate),
                  function(a, b){ return a && b }
  );
}
```

- _.some, alias any
 - naive implementation:

```javascript
_.some = function(collection, predicate){
  return _.reduce(_.map(collection, predicate),
                  function(a, b){ return a || b }
  );
}
```

----

## Reduce cousins

- _.max, min
 - You can pass an evaluator function

```javascript
var pokemon_awesomeness_rate = function(pokemon){/*...*/};
var most_awesome_pokemon = _.max(pokemons, pokemon_awesomeness_rate);
```

---

## Gang of *By

```javascript
_(pokemons).groupBy('type');
_(pokemons).groupBy(function(pokemon){pokemon.stats.hp});
_(pokemons).indexBy('name');
_(pokemons).indexBy(function(pokemon){pokemon.id + ": " + pokemon.name});
_(pokemons).sortBy('name');
_(pokemons).sortBy(pokemon_awesomeness_rate);
_(pokemons).countBy(function(pokemon){return pokemon.type.length});
_(pokemons).countBy(function(pokemon){return pokemon.type[0]});
```

---

## Some other useful collections/array manipulation functions

- shuffle
- sample
- head, first, take
- tail, rest, drop
- range
- union, intersection, difference, uniq

---

## Object manipulation tricks

- keys, values, pairs
- pick, omit
- clone
- isEqual
- Look the docs

---

##### Functions for manipulating, eh, functions

- bind

  - Binds a function to a context.
  - Returns a new function. Remember, pure functions
  - You can bind parameters too.

```javascript
var bauba = _(pokemon).where({name: 'Baubasaur'});
var praise_pokemon = function(praise){return this.name + ", " + praise};
var praise_bauba = _.bind(praise_pokemon, bauba, "you are the best!!");
praise_bauba()
```

- Cousin bindAll: Tricky. Read the docs!

----

##### Functions for manipulating, eh, functions

- partial

  - As bind, but just for binding parameters

```javascript
var map_over_pokemons = _.partial(_.map, pokemons);
var pokemon_images = map_over_pokemons(function(pokemon){return pokemon.img});

var stronger_than_first_and_faster_than_second = function(first, second){
  return _.filter(pokemons, function(pokemon){
    return pokemon.stats.attack > first &&
           pokemon.stats.speed  > second;
  });
};

var stronger_than_50_and_faster_than = _.partial(
  stronger_than_first_and_faster_than_second, 50
);

var faster_than_50_and_stronger_than = _.partial(
  stronger_than_first_and_faster_than_second, _, 50
);
```

----

##### Functions for manipulating, eh, functions

- Memoize
  - Explained in the beggining. Returns a memoized version of the function.
- Compose
  - Compose your functions with more ease

```javascript
var declare = function(fancy_word){
  return "Pokemons are " + fancy_word + " awesome."
};
var change = function(sentence){
  return sentence.replace(/Pokemons/, "Digimons").replace(/awesome/, "lame")
};
var yell = function(sentence){
  return sentence.toUpperCase().replace('.', "!!!")
};
yell(change(declare('indeed')));
//'DIGIMONS ARE INDEED LAME!!!'
var yell_with_conviction = u.compose(yell, change, declare);
yell_with_conviction('freaking');
//'DIGIMONS ARE FREAKING LAME!!!'
```

---

## Bonus!

- Alternative sintaxes

```javascript
// Rubysts say
_(collection).transform(base_function)
// Pythonist say
_.transform(collection, base_function)
// They are _exactly_ the same
```

- Chaining sintax

```javascript
var name_and_stats = function(pokemon){
  return _.pick(pokemon, 'name', 'stats');
}

_.chain(pokemon).filter(hp_higher_than_100).
                 map(name_and_stats).
                 orderBy('name').
                 head(10).
                 value();
```

---

## Conclusion

- Underscore allows you to manipulate functions, objects and collections real simply and ellegantly
- Underscore keeps the main concepts of functional programming
- Try to keep them too, when possible
  - Avoid handling state
  - Avoid modifying your variables
  - Use PURE FUNCTIONS
  - Side effects are tainting. Isolate them
  - Think about how is the solution defined, not how can you achieve it.

---

## Further reading

- [Underscore page](http://underscorejs.org/)
- [Underscore Annotated Source Code](http://underscorejs.org/docs/underscore.html): surprisingly simple and small!
- [Execution in the Kingdom of Nouns](http://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html): A funny reading about Object Oriented vs Functional Programming.
- [Async Library](https://github.com/caolan/async): "Async provides around 20 functions that include the usual 'functional' suspects (map, reduce, filter, each...) as well as some common patterns for asynchronous control flow (parallel, series, waterfall...)."

----


## Further reading

  - [Learn You a Haskell for Great Good!](http://learnyouahaskell.com): "the funkiest way to learn Haskell, which is the best functional programming language around.", but also a great way to better understand some concepts shown here, with a funny mood, if you enjoyed it (: (Mostly chapters II and VI)

---

## Challenges

- Make me a pokedex!!!
  - This pokemon database is available at https://raw2.github.com/mxtopher/talk-underscore/gh-pages/pokemon.js
  - I want to be able to search a pokemon by name (Ok, only perfect match you lazy guys!)
  - I want to be able to filter only pokemons with hp between X and Y
  - Same for whatever other attribute you consider important
  - Another filter of your choice

----

## Challenges

  - Three types of listing: compact, normal and extended. I trust your criteria of what to include in each.
  - Show please some summarization of the results. Number of pokemons found, average attack, you decide.
  - Do all the filtering, mapping, reducing and whatever you find fit with underscore.
  - ???
  - Profit!
