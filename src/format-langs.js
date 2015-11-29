var path = require('path');
var fs = require('fs');

module.exports = propFiles => {
  return propFiles.map(file => {
    var langFiles = fs.readdirSync(path.dirname(file)).map(fn => {
      return path.join(path.dirname(file), fn);
    });

    return {
      mainPath: file,
      langs: langFiles.filter(filename => {
        return filename !== file;
      }).map(filename => {
        return {
          path: filename
        };
      })
    };
  });
};
