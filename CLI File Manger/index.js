#!/usr/bin/env node
const readline = require("readline");
const path = require("path");
const fs = require("fs");

let currentDir = process.cwd();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "file-manager > ",
});

console.log("Welcome to Node.js CLI File Manager!");
rl.prompt();

rl.on("line", async (line) => {
    const [command, ...args] = line.trim().split(" ");
    try {
        switch (command) {
            case "ls":
                await require("./commands/ls")(currentDir);
                break;
            case "cd":
                currentDir = await require("./commands/cd")(currentDir, args[0]);
                break;
            case "mkdir":
                await require("./commands/mkdir")(currentDir, args[0]);
                break;
            case "create":
                await require("./commands/create")(currentDir, args[0]);
                break;
            case "delete":
                await require("./commands/delete")(currentDir, args[0]);
                break;
            case "read":
                await require("./commands/read")(currentDir, args[0]);
                break;
            case "write":
                await require("./commands/write")(currentDir, args[0], args.slice(1).join(" "));
                break;
            case "append":
                await require("./commands/append")(currentDir, args[0], args.slice(1).join(" "));
                break;
            case "rename":
                await require("./commands/rename")(currentDir, args[0], args[1]);
                break;
            case "move":
                await require("./commands/move")(currentDir, args[0], args[1]);
                break;
            case "copy":
                await require("./commands/copy")(currentDir, args[0], args[1]);
                break;
            case "currentDir":
                console.log(currentDir);
                break;
            case "exit":
                rl.close();
                break;
            default:
                console.log(`Unknown command: ${command}`);
        }
    } catch (err) {
        console.error("error", err.message);
    }

    rl.prompt();
}).on("close", () => {
    console.log("Goodbye!");
    process.exit(0);
});
