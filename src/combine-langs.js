var uniqueDirs = require('./unique-dirs');
var path = require('path');
var _ = require('lodash');

function findMaster(files) {
  return _.sortBy(files, fn => {
    return (fn.match(/_/g) || []).length
  })[0];
};

function findSameDir(base, paths) {
  return paths.filter(p => {
    return path.dirname(p) === path.dirname(base);
  });
}

function removeLangs(props) {
  if (uniqueDirs(props) >= props.length) {
    return props;
  }

  var i = 0;
  var sd;

  do {
    locSet = findSameDir(props[i++], props);
  } while (locSet.length === 1);

  var out = props.filter(p => {
    return path.dirname(locSet[0]) !== path.dirname(p);
  });

  return removeLangs(out.concat(findMaster(locSet)));
}

module.exports = removeLangs;
