module.exports = (setA, setB) => {
  var setATotalKeys = Object.keys(setA).length;
  if (setATotalKeys === 0) {
    return {completion: 1, missing: []};
  }
  var missing = [];
  Object.keys(setA).forEach(k => {
    if (setB[k] === undefined) {
      missing.push(k);
    }
  });

  var foundKeys = setATotalKeys - missing.length;
  return {
    completion: foundKeys / setATotalKeys,
    missing: missing
  };
};
