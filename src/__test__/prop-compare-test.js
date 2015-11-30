var propCompare = require('../prop-compare');

describe('the prop compare function', () => {
  it('finds a perfect match for two empty lists', () => {
    expect(propCompare({}, {})).to.equal(1);
  });

  it('finds no match for two different lists', () => {
    expect(propCompare({'prop.foo': 'Hello'}, {})).to.equal(0);
  });

  it('computes a partial number for similar lists', () => {
    var stubA = {
      'prop.foo': 'Hello',
      'prop.bar': 'Goodbye'
    };
    var stubB = {
      'prop.foo': 'Hola'
    };
    expect(propCompare(stubA, stubB)).to.equal(0.5);
  });
});
