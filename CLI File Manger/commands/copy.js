const fs = require("fs");
const path = require("path");

module.exports = function copy(currentDir, src, dest) {
    return new Promise((resolve, reject) => {
        const from = path.join(currentDir, src);
        const to = path.join(currentDir, dest);
        fs.copyFile(from, to, err => {
            if (err) return reject(err);
            console.log("Copied");
            resolve();
        });
    });
};
