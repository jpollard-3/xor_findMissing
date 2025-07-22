// Bit operator practice problem:
// using only bit operators (no arithmatic) compare 2 integer arrays and find the 2 missing numbers


// This will xor all the elements of 2 arrays together and return the result.
// IE: if only one element is missing from one of the arrays it will return that

function findMissing(arr, arr2) {
  let sum = 0;
  // find out which array is longer and use it's length
  let len = (arr.length > arr2.length) ? arr.length : arr2.length;
  for (let i = 0; i < len; i++) {
    //xor everything from both arrays together 
    sum ^= arr[i] ^ arr2[i];
  }
  return sum;
}


// Make example array...
const example = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// deep copy it
const missing = JSON.parse(JSON.stringify(example));

// remove these numbers from "missing" array.
// created here so it's easier to change for testing
// note: with xor sequence does NOT matter.
const miss1 = 3;
const miss2 = 6;
//removal
missing.splice(missing.indexOf(miss1), 1);
missing.splice(missing.indexOf(miss2), 1);

//output the arrays: optional
console.log("----------------------------------");
console.log(example, missing);
document.write("example: ["+example+"]<br> missing:  ["+ missing +"]<br>");

//=== LOGIC ===
// get the combined xor of all the elements of both arrays together.
let a_xor_b = findMissing(missing, example);
// find the least significant (rightmost) bit that's different between the two missing elements
let lsb = a_xor_b & -a_xor_b;

//filter the arrays by lsb.. makes sure only one of the 2 missing are in the remainder array.. IE: only returns elements where LSB is set to 1.

let poe = example.filter((x) => x & (lsb == 1)); // part of example
let pom = missing.filter((x) => x & (lsb == 1)); // part of missing

// output lsb filtered arrays: optional
console.log(poe, pom);
document.write("poe: ["+poe+"]<br>pom: ["+ pom +"]");

// now the first missing number can be found with our XOR difference function
a = findMissing(pom, poe);

// now with the first missing number it can be XOR'd with a_xor_b to find the other missing number
b = a_xor_b ^ a;

//output solution
console.log(a, b);

// xor swap a and b because we can.
a = a ^ b;
b = a ^ b;
a = a ^ b;

console.log(a, b);
document.write("<br>a: "+a+" &nbsp;b: "+ b);

//Not used for this:

// bonus function find the missing number if the arry is sequential with only the missing array passed.
function findMissingSequential(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length + 1; i++) {
    sum ^= arr[i] ^ (i + 1);
  }
  return sum;
}

