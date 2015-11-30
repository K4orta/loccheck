var discover = require('./src/discover');
console.log('It runs!');

discover('/Users/ewong/blizzard/lib-loc-webapp-heroes')
  .then(props => {
    console.log(props);
  });
