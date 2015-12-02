var cmd = require('../../bin/lcheck');
var mock = require('mock-fs');
var mockProps = require('./message-stub');

describe('the command runner', () => {
  beforeEach(() => {
    this.buffer = '';
    this.output = {
      write: input => {
        this.buffer += input;
      }
    };
    mock(mockProps);
  });

  afterEach(() => {
    mock.restore();
  });

  it('prints "Hello World" to the output argument', done => {
    cmd('.', this.output).then(() => {
      var out = this.buffer;
      expect(out).to.equal('Hello World\n');
    }).then(done, done);
  });
});
