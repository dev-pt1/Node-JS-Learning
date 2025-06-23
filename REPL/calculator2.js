const repl = require('repl');

const operations = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => b !== 0 ? a / b : 'Cannot divide by zero',
};

// In-memory variable storage
const variables = {};

const myRepl = repl.start({
    prompt: 'calc > ',
    eval: (cmd, context, filename, callback) => {
        try {
            const input = cmd.trim().replace(/\n/g, '');

            // Handle variable declaration like: let x = 10
            if (input.startsWith('let ')) {
                const match = input.match(/^let\s+([a-zA-Z_]\w*)\s*=\s*(-?\d+(\.\d+)?)$/);
                if (!match) return callback(null, '❌ Invalid syntax. Use: let x = 10');

                const [, varName, value] = match;
                variables[varName] = Number(value);
                return callback(null, `✅ Stored ${varName} = ${value}`);
            }

            // Handle chained operations
            const steps = input.split('|').map(step => step.trim());
            let lastResult = null;

            for (let i = 0; i < steps.length; i++) {
                const parts = steps[i].split(' ');
                const operation = parts[0];
                let a, b;

                if (!operations[operation]) {
                    return callback(null, `❌ Unknown operation "${operation}".`);
                }

                const resolve = (val) => {
                    if (!isNaN(val)) return Number(val);
                    if (variables[val] !== undefined) return variables[val];
                    throw new Error(`❌ "${val}" is not a number or defined variable.`);
                };

                if (i === 0) {
                    a = resolve(parts[1]);
                    b = resolve(parts[2]);
                } else {
                    a = lastResult;
                    b = resolve(parts[1]);
                }

                lastResult = operations[operation](a, b);
            }

            callback(null, lastResult);
        } catch (err) {
            callback(null, err.message);
        }
    }
});

console.log("📦 Welcome to REPL Calculator with Variables!");
console.log("You can:");
console.log(" - let x = 10");
console.log(" - add x 5");
console.log(" - add 5 10 | mul x");
console.log("Supported operations: add, sub, mul, div");
