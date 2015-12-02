var propCompare = require('../prop-compare');

describe('the prop compare function', () => {
  it('finds a perfect match for two empty lists', () => {
    expect(propCompare({}, {}).completion).to.equal(1);
  });

  it('finds no match for two different lists', () => {
    expect(propCompare({'prop.foo': 'Hello'}, {}).completion).to.equal(0);
  });

  it('computes a partial number for similar lists', () => {
    var stubA = {
      'prop.foo': 'Hello',
      'prop.bar': 'Goodbye'
    };
    var stubB = {
      'prop.foo': 'Hola'
    };
    expect(propCompare(stubA, stubB).completion).to.equal(0.5);
    stubA = {
      'prop.foo': 'Hello',
      'prop.bar': 'Goodbye',
      'prop.baz': 'Welcome',
      'prop.qux': 'Thanks'
    };

    expect(propCompare(stubA, stubB).completion).to.equal(0.25);
  });

  it('returns a list of missing props', () => {
    var stubA = {
      'prop.foo': 'Hello',
      'prop.bar': 'Goodbye'
    };
    var stubB = {
      'prop.foo': 'Hola'
    };
    expect(propCompare(stubA, stubB).missing).to.contain('prop.bar');
  });
});
