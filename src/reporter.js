var path = require('path');
var compareProps = require('./prop-compare');

function stripFilepath(fpath) {
  return path.basename(fpath, '.properties');
}

module.exports = props => {
  var subjectName = stripFilepath(props.path);
  var computedLangs = props.langs.map(lng => {
    var langName = stripFilepath(lng.path).replace(subjectName + '_', '');
    return {
      title: langName,
      path: lng.path,
      completion: compareProps(props.props, lng.props)
    };
  });

  return {
    title: subjectName,
    path: props.path,
    langs: computedLangs,
    completion: computedLangs.reduce((prev, lang) => {
      return prev + lang.completion;
    }, 0) / computedLangs.length
  };
};
