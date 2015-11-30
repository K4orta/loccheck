var path = require('path');
var fs = require('fs');
var loadProps = require('./parsing/load-props');

module.exports = propFiles => {
  return propFiles.map(file => {
    var langFiles = fs.readdirSync(path.dirname(file))
      .map(fn => {
        return path.join(path.dirname(file), fn);
      });

    return new Promise(resolve => {
      Promise.all(langFiles.map(lang => {
        return loadProps(lang);
      })).then(langs => {
        resolve({
          mainPath: file,
          props: langs.find(lang => {
            return lang.path === file;
          }).props,
          langs: langs.filter(lang => {
            return lang.path !== file;
          })
        });
      });
    });
  });
};
