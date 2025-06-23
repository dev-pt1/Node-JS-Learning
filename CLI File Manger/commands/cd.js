const path = require("path");
const fs = require("fs");

module.exports = function cd(currentDir, dir) {
    return new Promise((resolve, reject) => {
        const newPath = path.resolve(currentDir, dir);
        if (!fs.existsSync(newPath) || !fs.statSync(newPath).isDirectory()) {
            return reject(new Error("Directory not found"));
        }
        resolve(newPath);
    });
};
