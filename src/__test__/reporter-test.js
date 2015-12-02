var formatReport = require('../reporter');

describe('the reporter', () => {
  before(() => {
    this.stub = {
      path: 'foo/foo.properties',
      props: {
        'foo.prop.title': 'Color',
        'foo.prop.description': 'blah'
      },
      langs: [
        {
          path: 'foo/foo_es_MX.properties',
          props: {
            'foo.prop.title': 'El Color'
          }
        },
        {
          path: 'foo/foo_fr_FR.properties',
          props: {
            'foo.prop.title': 'El Color',
            'foo.prop.description': 'blablabla'
          }
        }
      ]
    };

    this.altStub = {
      path: 'bar/bar.properties',
      langs: []
    };
  });

  it('returns an object with main file title', () => {
    expect(formatReport(this.stub).title).to.equal('foo');
    expect(formatReport(this.altStub).title).to.equal('bar');
  });

  it('returns an object with a list of languages', () => {
    var report = formatReport(this.stub);
    expect(report.langs).to.be.an('array');
    expect(report.langs.length).to.equal(2);
  });

  it('creates a title for each language file', () => {
    var report = formatReport(this.stub);
    var fr = report.langs.find(lang => {
      return lang.path === 'foo/foo_fr_FR.properties';
    });

    expect(fr.title).to.equal('fr_FR');
  });

  it('generates the completion percent for each language', () => {
    var report = formatReport(this.stub);
    var fr = report.langs.find(lang => {
      return lang.title === 'fr_FR';
    });
    var es = report.langs.find(lang => {
      return lang.title === 'es_MX';
    });

    expect(fr.completion).to.equal(1);
    expect(es.completion).to.equal(0.5);
  });

  it('generates an overall coverage percent', () => {
    expect(formatReport(this.stub).completion).to.equal(0.75);
  });

  it('includes a list of missing props for each language', () => {
    var report = formatReport(this.stub);
    var es = report.langs.find(lang => {
      return lang.title === 'es_MX';
    });
    expect(es.missing).to.contain('foo.prop.description');
  });
});
