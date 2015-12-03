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

  it('prints the file titles and completion to the output argument', done => {
    cmd('.', this.output).then(() => {
      var out = this.buffer;
      expect(out).to.contain('common: 100%');
      expect(out).to.contain('uncommon: 50%');
    }).then(done, done);
  });
});
