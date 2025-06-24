const fs = require('fs');
const path = require('path');

module.exports = function copyFileWithStream(currentDir, src, dest) {
    return new Promise((resolve, reject) => {
        const from = path.join(currentDir, src);
        const to = path.join(currentDir, dest);

        const readStream = fs.createReadStream(from);
        const writeStream = fs.createWriteStream(to);

        readStream.on('error', reject);
        writeStream.on('error', reject);
        writeStream.on('close', () => {
            console.log('✅ File copied successfully using stream.');
            resolve();
        });

        readStream.pipe(writeStream);
    });
};
