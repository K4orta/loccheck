module.exports = (setA, setB) => {
  if (Object.keys(setA).length !== Object.keys(setB).length) {
    return 0;
  }

  return 1;
};
