const fs = require("fs");
const path = require("path");

module.exports = function rm(currentDir, fileName) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(currentDir, fileName);
        fs.rm(filePath, { recursive: true, force: true }, err => {
            if (err) return reject(err);
            console.log("Deleted");
            resolve();
        });
    });
};
