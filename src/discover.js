var fs = require('fs');
// var pat = require('path');

function walk(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, contents) => {
      if (err !== null) {
        reject(err);
      }
      resolve(contents);
    });
  });
}

module.exports = path => walk(path);
