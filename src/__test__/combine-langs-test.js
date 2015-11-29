var combineLangs = require('../combine-langs');

describe('the language combiner', () => {
  before(() => {
    this.props = [
      'libloc/bar/bar_es_MX.properties',
      'libloc/bar/bar.properties',
      'libloc/bar/bar_fr_FR.properties',
      'libloc/foo/foo.properties',
      'libloc/foo/foo_es_MX.properties'
    ];
  });

  it('leaves alone a list with languages removed', () => {
    var propList = ['libloc/foo/foo.properties', 'libloc/bar/bar.properties'];
    expect(combineLangs(propList).length).to.equal(2);
  });

  it('strips out language variants', () => {
    var cl = combineLangs(this.props);
    expect(cl.length).to.equal(2);
    expect(cl[0]).to.equal('libloc/bar/bar.properties');
    expect(cl[1]).to.equal('libloc/foo/foo.properties');
  });
});
