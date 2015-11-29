var fs = require('fs');
var path = require('path');
var combineLangs = require('./combine-langs');
var formatLangs = require('./format-langs');

function readdir(rootpath) {
  var stats = fs.statSync(rootpath);
  if (stats.isFile() && rootpath.match(/\.properties$/)) {
    return rootpath;
  }

  if (stats.isDirectory()) {
    var entities = fs.readdirSync(rootpath);
    var paths = [];
    entities.forEach(x => {
      paths = paths.concat(readdir(path.join(rootpath, x)));
    });
    return paths;
  }
  return [];
}

module.exports = rootpath => {
  return new Promise(resolve => {
    var props = readdir(rootpath);
    var combined = combineLangs(props);
    resolve(formatLangs(combined));
  });
};
