var reporter = require('../reporter');

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

  it('generates a percent of languages translated');
});
