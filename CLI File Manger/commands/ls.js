const fs = require("fs");
const path = require("path");

module.exports = function ls(currentDir) {
    return new Promise((resolve, reject) => {
        fs.readdir(currentDir, (err, files) => {
            if (err) return reject(err);
            files.forEach(file => console.log(file));
            resolve();
        });
    });
};
