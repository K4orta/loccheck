var stub = [
  {
    title: 'common',
    path: 'libloc/foo/messages/common/common.properties',
    langs: [
      {
        title: 'es_mx',
        path: 'libloc/foo/messages/common/common_es_mx.properties',
        completion: 1,
        missing: []
      }
    ],
    completion: 1
  },
  {
    title: 'uncommon',
    path: 'libloc/foo/messages/uncommon/uncommon.properties',
    langs: [
      {
        title: 'en_GB',
        path: 'libloc/foo/messages/uncommon/uncommon_en_GB.properties',
        completion: 0.5,
        missing: ['bar.prop.description']
      }
    ],
    completion: 0.5
  }
];

var prettyPrint = require('../pretty-print');

describe('the pretty print fucntion', () => {
  it('prints out all file titles', () => {
    var pp = prettyPrint(stub);
    expect(pp).to.contain('common');
    expect(pp).to.contain('uncommon');
  });

  it('prints out the completion for each file', () => {
    var pp = prettyPrint(stub);
    expect(pp).to.contain('common: 100%');
    expect(pp).to.contain('uncommon: 50%');
  });

  it('prints the language breakdown if completion < 100%', () => {
    var pp = prettyPrint(stub);
    expect(pp).to.contain('uncommon: 50%\n  en_GB: 50%');
  });
});
