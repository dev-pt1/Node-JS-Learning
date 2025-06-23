const fs = require("fs");
const path = require("path");

module.exports = function rename(currentDir, oldName, newName) {
    return new Promise((resolve, reject) => {
        const oldPath = path.join(currentDir, oldName);
        const newPath = path.join(currentDir, newName);
        fs.rename(oldPath, newPath, err => {
            if (err) return reject(err);
            console.log("Renamed");
            resolve();
        });
    });
};
