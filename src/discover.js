var fs = require('fs');
var path = require('path');

function readdir(rootpath) {
  var stats = fs.statSync(rootpath);
  if (stats.isFile()) {
    return rootpath;
  }
  var entities = fs.readdirSync(rootpath);
  var paths = [];
  entities.forEach(x => {
    paths = paths.concat(readdir(path.join(rootpath, x)));
  });
  return paths;
}

module.exports = rootpath => {
  return new Promise(resolve => {
    resolve(readdir(rootpath));
  });
};
