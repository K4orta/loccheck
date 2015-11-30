var discover = require('./src/discover');
console.log('It runs!');

discover('.')
  .then(props => {
    console.log(props);
  });
