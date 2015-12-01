var discover = require('./src/discover');
var reporter = require('./src/reporter');

discover('.')
  .then(props => {
    props.forEach(prop => {
      var rp = reporter(prop);
      console.log(rp);
    });
  });
