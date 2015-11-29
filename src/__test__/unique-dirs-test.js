var uniqueDirs = require('../unique-dirs');

describe('the unique dirs function', () => {
  it('counts the number of unique directories', () => {
    var udirs = uniqueDirs([
      'foo/foo.properties',
      'foo/bar.properties',
      'bar/baz.properties'
    ]);

    expect(udirs).to.equal(2);
  });
});
