const fs = require("fs");
const path = require("path");

module.exports = function read(currentDir, fileName) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(currentDir, fileName);
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) return reject(err);
            console.log(data);
            resolve();
        });
    });
};
