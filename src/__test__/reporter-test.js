var formatReport = require('../reporter');

describe('the reporter', () => {
  before(() => {
    this.stub = {
      mainPath: 'foo/foo.properties',
      props: {
        'bar.prop.title': 'Color',
        'bar.prop.description': 'Blah'
      },
      langs: [
        {
          path: 'foo/foo_es_MX.properties',
          props: {
            'bar.prop.title': 'El Color'
          }
        }
      ]
    };
  });

  it('returns an object with main file title', () => {
    expect(formatReport(this.stub).title).to.equal('foo');
  });

  // it('generates a percent of languages translated', () => {
  //   expect(formatReport(this.stub).).to.equal();
  // });
});
