#!/usr/bin/env node

var discover = require('../src/discover');
var reporter = require('../src/reporter');
var prettyPrint = require('../src/pretty-print');

module.exports = (workdir, out) => {
  return discover(workdir)
    .then(props => {
      var reports = props.map(prop => {
        return reporter(prop);
      });

      out.write(prettyPrint(reports));
    });
};
