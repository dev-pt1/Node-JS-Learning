const fs = require("fs");
const path = require("path");

module.exports = function mkdir(currentDir, dirName) {
    return new Promise((resolve, reject) => {
        const dirPath = path.join(currentDir, dirName);
        fs.mkdir(dirPath, { recursive: true }, err => {
            if (err) return reject(err);
            console.log("Folder created");
            resolve();
        });
    });
};
