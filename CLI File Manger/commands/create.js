const fs = require("fs");
const path = require("path");

module.exports = function create(currentDir, fileName) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(currentDir, fileName);
        fs.writeFile(filePath, "", err => {
            if (err) return reject(err);
            console.log("File created");
            resolve();
        });
    });
};
