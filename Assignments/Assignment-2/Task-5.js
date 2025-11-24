let numbers = [10, 25, 7, 42, 18];

let sum = numbers.reduce((acc, val) => acc + val, 0);
let largest = Math.max(...numbers);

console.log("Sum:", sum);
console.log("Largest number:", largest);
