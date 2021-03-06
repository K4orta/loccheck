var mock = require('mock-fs');
var discoverProps = require('../discover');
var mockProps = require('./message-stub');

describe('The discovery function', done => {
  it('returns an empty array when there are no messages to discover', () => {
    mock({
      libloc: {
        foo: {}
      }
    });

    discoverProps('libloc').then(props => {
      expect(props.length).to.equal(0);
    }).then(done, done);
  });

  it('rejects on error', done => {
    mock({});
    discoverProps('blah').catch(err => {
      expect(err.message).to.equal('ENOENT, no such file or directory \'blah\'');
      done();
    });
  });

  it('loads all messages', done => {
    mock({
      libloc: {
        foo: {'foo.properties': 'foo = a'},
        bar: {'bar.properties': 'bar = b'}
      }
    });

    discoverProps('libloc').then(props => {
      expect(props.length).to.equal(2);
    }).then(done, done);
  });

  it('only discovers dirs with prop files', done => {
    mock({
      libloc: {
        foo: {'foo.properties': 'foo = a'},
        bar: {'bar.properties': 'bar = b'},
        baz: {}
      }
    });

    discoverProps('libloc').then(props => {
      expect(props.length).to.equal(2);
    }).then(done, done);
  });

  it('discovers deeply nested prop files', done => {
    mock({
      libloc: {
        biz: {'biz.properties': 'foo = a'},
        foo: {
          fiz: {
            liz: {'foo.properties': 'foo = a'}
          }
        },
        bar: {'bar.properties': 'bar = b'},
        baz: {}
      }
    });

    discoverProps('libloc').then(props => {
      expect(props.length).to.equal(3);
      expect(props[1].path).to.equal('libloc/biz/biz.properties');
    }).then(done, done);
  });

  it('only returns properties files', done => {
    mock({
      libloc: {
        foo: {
          'foo.properties': 'foo = a'
        },
        bar: {
          'bar.properties': 'bar = b'
        },
        baz: {
          'baz.java': 'baz = b'
        }
      }
    });

    discoverProps('libloc').then(props => {
      expect(props.every(f => {
        return f.path.match(/\.properties$/);
      })).to.equal(true);
    }).then(done, done);
  });

  it('returns only one main file per directory', done => {
    mock({
      libloc: {
        foo: {
          'foo.properties': 'foo = a',
          'foo_es_MX.properties': 'foo = a'
        },
        bar: {
          'bar.properties': 'bar = b',
          'bar_es_MX.properties': 'bar = b',
          'bar_fr_FR.properties': 'bar = b'
        }
      }
    });

    discoverProps('libloc').then(props => {
      expect(props.length).to.equal(2);
    }).then(done, done);
  });

  it('keeps track of alt languages', done => {
    mock(mockProps);
    discoverProps('libloc').then(props => {
      expect(props[0].langs.length).to.equal(1);
      expect(props[0].langs[0].path).to.equal('libloc/foo/messages/common/common_es_mx.properties');
    }).then(done, done);
  });

  it('fills main prop field with properties', done => {
    mock(mockProps);
    discoverProps('libloc').then(props => {
      expect(props[0].props['foo.prop.greeting']).to.equal('Hello');
    }).then(done, done);
  });

  it('fills sub languages with properties', done => {
    mock(mockProps);
    discoverProps('libloc').then(props => {
      expect(props[0].langs[0].props['foo.prop.greeting']).to.equal('Hola');
    }).then(done, done);
  });

  after(() => {
    mock.restore();
  });
});
