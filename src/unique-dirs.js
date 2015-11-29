var path = require('path');

module.exports = paths => {
  var dirs = {};
  paths.forEach(p => {
    dirs[path.dirname(p)] = true;
  });
  return Object.keys(dirs).length;
};
