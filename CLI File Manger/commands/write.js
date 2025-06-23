const fs = require("fs");
const path = require("path");

module.exports = function write(currentDir, fileName, content) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(currentDir, fileName);
        fs.writeFile(filePath, content, err => {
            if (err) return reject(err);
            console.log("File written");
            resolve();
        });
    });
};
