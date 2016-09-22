const fs = require('fs');

module.exports = () => (fileName) => new Promise((resolve, reject) => {
  fs.readFile(fileName, 'utf8', (error, data) => {
    if (error) {
      reject(`Cannot read file ${fileName}`);
    }

    resolve(data);
  });
});
