var sha1 = require('sha1');
var fs = require('fs');

var file1 = fs.readFileSync('./shattered-1.pdf');
var file2 = fs.readFileSync('./shattered-2.pdf');

let hash1 = sha1(file1);
let hash2 = sha1(file2);

console.log(hash1);
console.log(hash2);