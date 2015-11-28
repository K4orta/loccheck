var mock = require('mock-fs');
var discoverProps = require('../discover');

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
        bzr: {}
      }
    });

    discoverProps('libloc').then(props => {
      expect(props.length).to.equal(2);
    }).then(done, done);
  });
});
