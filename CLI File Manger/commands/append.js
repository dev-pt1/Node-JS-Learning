const fs = require("fs");
const path = require("path");

module.exports = function append(currentDir, fileName, content) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(currentDir, fileName);
        fs.appendFile(filePath, content + "\n", (err) => {
            if (err) return reject(err);
            console.log("Content appended");
            resolve();
        });
    });
};
