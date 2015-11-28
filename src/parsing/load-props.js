var props = require('properties');
var fs = require('fs');

module.exports = path => new Promise((resolve, reject) => {
  fs.readFile(path, (err, data) => {
    if (err !== null) {
      reject(err);
    }
    resolve(props.parse(String(data)));
  });
});
