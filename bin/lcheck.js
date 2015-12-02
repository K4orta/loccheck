#!/usr/bin/env node

var discover = require('../src/discover');
var reporter = require('../src/reporter');

module.exports = (workdir, out) => {
  return discover(workdir)
    .then(props => {
      props.forEach(prop => {
        var rp = reporter(prop);
        console.log(rp);
      });
      out.write('Hello World\n');
    });
};
