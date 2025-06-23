const repl = require('repl');

// Helper functions
const operations = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => b !== 0 ? a / b : 'Cannot divide by zero',
};

// Start the REPL
const myRepl = repl.start({ prompt: 'calc > ' });

// Define custom commands
myRepl.context.add = (a, b) => operations.add(Number(a), Number(b));
myRepl.context.sub = (a, b) => operations.sub(Number(a), Number(b));
myRepl.context.mul = (a, b) => operations.mul(Number(a), Number(b));
myRepl.context.div = (a, b) => operations.div(Number(a), Number(b));

console.log("Welcome to Node REPL Calculator!");
console.log("Usage:");
console.log(" - add(5, 10)");
console.log(" - sub(10, 3)");
console.log(" - mul(4, 7)");
console.log(" - div(8, 2)");
