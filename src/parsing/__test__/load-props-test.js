var propLoader = require('../load-props');
var mock = require('mock-fs');

describe('the prop loading function', () => {
  beforeEach(() => {
    mock({
      libloc: {
        foo: {
          messages: {
            common: {
              'common.properties': 'foo.prop.greeting = Hello',
              'common_es_mx.properties': 'foo.prop.greeting = Hola'
            },
            uncommon: {
              'uncommon.properties': 'bar.prop.title = Color',
              'uncommon_en_GB.properties': 'bar.prop.title = Colour'
            }
          }
        }
      }
    });
  });

  it('returns parsed propertiy files', done => {
    var loaded = propLoader('libloc/foo/messages/common/common.properties');
    loaded
      .then(props => {
        expect(props['foo.prop.greeting']).to.equal('Hello');
      }).then(done, done);
  });

  it('rejects if the provided file does not exist', done => {
    var loaded = propLoader('libloc/foo/messages/common/blah.properties');
    loaded
      .catch(err => {
        expect(err.message).to.equal('ENOENT, no such file or directory \'libloc/foo/messages/common/blah.properties\'');
      })
      .then(done, done);
  });
});
