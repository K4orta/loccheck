var cmd = require('./bin/lcheck');
var workdir = process.argv[2] || process.cwd();
cmd(process.stdout, workdir);
