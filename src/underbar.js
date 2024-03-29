(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) { 
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : n > array.length ? array : array.slice(array.length-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i=0; i<collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var i in collection) {
        iterator(collection[i], i, collection);
       }
     }
  }

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(item) {
      if (test(item)) {
        result.push(item)
      }
    })
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    var match = _.filter(collection, test)
    var retArr = [];
    for (var i=0; i<collection.length; i++) {
      if (_.indexOf(match, collection[i]) === -1) {
        retArr.push(collection[i]);
      }
    }
    return retArr;

    //return _.filter(collection, !test)
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    var filteredArr = array.slice();
    var returnArr = [];
    while (filteredArr.length > 0) 
    {
       returnArr.push(filteredArr[0]);
       filteredArr = filteredArr.filter(x => x !== filteredArr[0])
    }
    return returnArr;
  };


//  Return the results of applying an iterator to each element.
  // _.map = function(collection, iterator) {
  //   var returnArr = [];
  //   var returnObj = {};
  //   if (Array.isArray(collection)) {
  //     for (var i=0; i<collection.length; i++) {
  //       returnArr.push(iterator(collection[i]));
  //     }
  //     return returnArr;
  //   } else {
  //     for (var i in collection) {
  //       returnObj(iterator(i)) = iterator(collection[i]);
  //     }
  //     return returnObj;
  //   }
  //   // map() is a useful primitive iteration function that works a lot
  //   // like each(), but in addition to running the operation on all
  //   // the members, it also maintains an array of results.
  // };

  _.map = function(collection, iterator) {
    var result = [];
    _.each(collection, function(i) {
      result.push(iterator(i));
    })
    return result;
  }

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  //_.pluck([{age:5},{age:7},{age:10}],'age');

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  //iterator(value, key, collection)

  _.reduce = function(collection, iterator, accumulator) {
    if (Array.isArray(collection)) {
      var accumulator = accumulator;
      var item = collection[0];
      if (accumulator === undefined) { 
        accumulator = collection[0];
        for (var i=1;i<collection.length;i++) {
          accumulator = iterator(accumulator, collection[i])
        }
        return accumulator;
      }
      for (var i=0; i<collection.length; i++) { 
        accumulator = iterator(accumulator, collection[i]);
      }
      return accumulator;   
    }
    var accumulator = accumulator;
    var item = collection[Object.keys(collection)[0]];
    var length = Object.keys(collection).length;
    if (accumulator === undefined) { 
      accumulator = item;
      for (var i=1;i<length;i++) {
        accumulator = iterator(accumulator, collection[Object.keys(collection)[i]])
      }
      return accumulator;
    }
    for (var i=0; i<length; i++) { 
      accumulator = iterator(accumulator, collection[Object.keys(collection)[i]]);
    }
    return accumulator;   
  }


  // _.reduce = function (collection, iterator, accumulator) {
  //   accumulator = accumulator || (!Array.isArray(collection)) ? collection[Object.keys(collection)[0]] : collection[0];
  //   _.each(collection, function() {
  //      accumulator += iterator(accumulator, item);
  //   })
  //   return accumulator;
  // }

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (typeof arguments[1] !== 'function') { 
      for (var i=0; i< collection.length; i++) {
        if (!collection[i]) { 
          return false 
        }
      }
      return true
    }
    return _.reduce(collection, function(accumulator, item) {
     if (!accumulator) {
        return false; 
      }
      return Boolean(iterator(item));
    }, true);
  }

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (collection.length === 0) { return false }
    if (arguments.length === 1) { return _.contains(collection, true) }  
    // for (var i=0; i< collection.length; i++) {
    //   return _.every(collection.slice(i,i+1), iterator);
    // }
    for (var i=0; i<collection.length; i++) {
      if (iterator(collection[i])) { return true }
    }
  return false
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
  
  var argFunc = function sortArgs() {
    return Array.from(arguments).sort(function (a, b) { return a - b; });
  }
  var argArr = argFunc(arguments)
  //console.log(argArr[0]);
  var returnObj = {};

  for (var i=0;i<argArr[0].length;i++) {
    for (var j in argArr[0][i])
      argArr[0][0][j] = argArr[0][i][j];
    //  console.log(j)
    //  console.log(argArr[0][i][j])
  }
  // console.log(obj)
  // console.log(argArr[0])
  // console.log(returnObj)
  // console.log('---------------')
  return argArr[0][0];

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  var argFunc = function sortArgs() {
    return Array.from(arguments).sort(function (a, b) { return a - b; });
  }
  var argArr = argFunc(arguments)
  //console.log(argArr[0]);
  var returnObj = {};

  for (var i=1;i<argArr[0].length;i++) {
    //if any keys in first obj match keys in later objects keep value of first obj key
    for (var j in argArr[0][i]) {
      if (!argArr[0][0][j] && argArr[0][0][j] !== '' && argArr[0][0][j] !== 0 && !Number.isNaN(argArr[0][0][j])) { argArr[0][0][j] = argArr[0][i][j] }
      //if (argArr[0][i][j] === undefined) { returnObj[j] = argArr[0][i][j]; }
      
     // console.log(j)
     // console.log(argArr[0][i][j])
    }
  }
  // console.log(obj)
  // console.log(argArr[0])
  // console.log(returnObj)
  // console.log('---------------')
  return argArr[0][0];
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  //var memoFunc = _.memoize(function (x) { return x * x })
  //memoFunc(2)
  _.memoize = function(func) {
    var argobj = {};
    
    return function () {
      var argArr = JSON.stringify(arguments)
      if (argobj[argArr] ) { 
        return argobj[argArr] 
      }
  
      argobj[argArr] = func.apply(this,arguments);
      
      return argobj[argArr];
      
    }

    
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    if (arguments.length > 2) {
      return setTimeout (func, wait, arguments[2],arguments[3])
    }
      return setTimeout(func, wait, arguments[1])
    
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var randarr = [];
    var copy = array.slice();

    function rand () {
        return (Math.floor(Math.random() * (array.length)));
    }

    while (randarr.length < array.length) {
        var num = rand();
        //if (randarr.indexOf(num) === -1) { randarr.push(num) }
        if (!_.contains(randarr,num)) { randarr.push(num)}
    }

    for (var i=0; i<copy.length; i++) {
        copy[randarr[i]] = array[i]
    }
    return copy;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    let returnArr = [];
    if (typeof functionOrKey === 'function') {
      for (var i=0; i<collection.length; i++) {
        returnArr.push(functionOrKey.apply(collection[i]));
      }
      return returnArr;
    }
    for (var i=0; i<collection.length; i++) {
        returnArr.push(String.prototype[functionOrKey].apply(collection[i]));
    }
    return returnArr;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    let returnArr = [];
    if (typeof iterator === 'string') {}
    if (typeof iterator === 'function') {
      var unsorted = [];
      for (var i=0; i<collection.length; i++) {
        unsorted.push([collection[i], iterator(collection[i])]);
      }
      // console.log(collection)
      // console.log(iterator)
      // console.log(unsorted);
    }
    
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var index = 0
    for(var i=0;i<arguments.length;i++) {
      let longest = 0;
      if (arguments[i].length>longest) {
        index = i+1;
      }
    }
    var arr = [];
    for (var i=0;i<index;i++) {
      var tempArr = [];
      for (var j=0; j<arguments.length; j++) {
        tempArr.push(arguments[j][i]);
      }
      arr.push(tempArr);
    }
    return arr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var result = [];
    for (var i=0; i<nestedArray.length; i++) {
      if (Array.isArray(nestedArray[i])) {
        result = result.concat(_.flatten(nestedArray[i]))
      } else {
        result.push(nestedArray[i]);
      }
    }
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    let obj = {};
    let returnArr = [];
    for (var i=0; i<arguments.length; i++) {
      for (var j=0; j<arguments[i].length; j++) {
        obj[arguments[i][j]] = obj[arguments[i][j]]+1 || 1;
      }
    }
    for (var key in obj) {
      if (obj[key] >= arguments.length) {
        returnArr.push(key);
      }
    }
    return returnArr;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    let first = arguments[0];
    let remain = [];
    let final = [];
    for (var i=1; i<arguments.length; i++) {
      for (var j=0; j<arguments[i].length; j++) {
        remain.push(arguments[i][j]);
      }
    }
    for (var i=0; i<first.length; i++) {
      if (!_.contains(remain, first[i])) {
        final.push(first[i]);
      }
    }
    return final;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
