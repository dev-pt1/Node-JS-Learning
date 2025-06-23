const fs = require("fs");
const path = require("path");

module.exports = function rm(currentDir, fileName) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(currentDir, fileName);

        // fs.rm can delete file or folder

        fs.rm(filePath, { recursive: true, force: true }, err => {
            if (err) return reject(err);
            console.log("Deleted");
            resolve();
        });

        //fs.unlink only delete file, not folder

        // fs.unlink("notes.txt", err => {
        //     if (err) throw err;
        //     console.log("File deleted!");
        // });
    });
};
