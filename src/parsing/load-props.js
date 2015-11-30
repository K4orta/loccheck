var props = require('properties');
var fs = require('fs');

module.exports = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err !== null) {
        reject(err);
      }
      resolve({
        path: path,
        props: props.parse(String(data))
      });
    });
  });
};
