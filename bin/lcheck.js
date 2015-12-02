#!/usr/bin/env node

var discover = require('../src/discover');
var reporter = require('../src/reporter');

module.exports = (out, workdir) => {
  return discover(workdir)
    .then(props => {
      props.forEach(prop => {
        var rp = reporter(prop);
        console.log(rp);
      });
      out.write('Hello World\n');
    }).catch(err => {
      console.log(err);
    });
};
