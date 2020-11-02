let blocked = require("blocked");
const limit = process.argv[2];



/**
* Generates the first N prime numbers and prints each value by resolving Promise objects
*/
function listPrimes( nPrimes ) {
  let promise=Promise.resolve();

  for( let n = 2, index = 0;  nPrimes > 0;  n++ ) {
      if( isPrime(n) ) {
        promise = resolvePromise(promise, "PRIME", index+1, n);
        index++
        nPrimes--;
      }
  }
}

/**
* checks the number is prime or not
*/
function isPrime( n ) {
  var max = Math.sqrt(n);
  for( var i = 2;  i <= max;  i++ ) {
    if( n % i === 0 )
      return false;
  }
  return true;
}


/**
* Generates first N fibonacci series and print each value by resolving Promise objects
* Parameter : fibonacci series limit  
*/
function listFibonacciSeries( n ){
  var arr = [0, 1];

  let promise=Promise.resolve()
  promise = resolvePromise(promise,"FIB", 1, arr[0]);
  promise = resolvePromise(promise,"FIB", 2, arr[1]);

  for (let i = 2; i < n; i++){
    
    arr.push(arr[i - 2] + arr[i -1])
    promise = resolvePromise(promise, "FIB", (i+1), arr[i]);
  }
 return arr[n]
}


/**
* Prints the passed parameter values as successful response to the passed Promise object  
*/
function resolvePromise(promise, printName, index, value) {
  promise = promise.then(function() {
    console.log(printName+" "+index+": "+value);
  });
  return promise;
}


//check if event loop is blocked and print the time the event loop is blocked
blocked(ms => {
  console.log("EVENT LOOP Blocked", ms);
});

//generate fibonacci numbers
listFibonacciSeries(limit);

//generate prime numbers
listPrimes(limit);
