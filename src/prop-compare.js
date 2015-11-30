module.exports = (setA, setB) => {
  var setATotalKeys = Object.keys(setA).length;
  if (setATotalKeys === 0) {
    return 1;
  }
  var foundKeys = 0;
  Object.keys(setA).forEach(k => {
    if (setB[k] !== undefined) {
      foundKeys += 1;
    }
  });

  return foundKeys / setATotalKeys;
};
