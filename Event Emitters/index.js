const EventEmitter = require('events');

const emitter = new EventEmitter;

// without argument

// emitter.on("greet", () => {
//     console.log("Hello Dev Vaghasiya");
// })

// emitter.emit("greet")

// with argument

// emitter.on("greet", (username) => {
//     console.log(`Hello ${username}`);
// })

// emitter.emit("greet", "Dev Vaghasiya")

// with object

emitter.on("greet", (args) => {
    console.log(`Hello ${args.username} your profession is ${args.profession} and you are ${args.age} years old`);
})

emitter.emit("greet", { username: "Dev Vaghasiya", profession: "NodeJS developer", age: 21 })