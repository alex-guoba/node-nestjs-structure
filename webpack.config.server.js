const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
module.exports = function(options) {
  options.devtool = isDev ? 'source-map' : false;
  options.output.path = path.join(__dirname, isDev ? '.localDist' : 'dist', 'server');
  options.module.rules = [
    ...options.module.rules,
    { test: /\.(sa|sc|c)ss$/, loader: path.join(__dirname, 'webpack', 'loader', 'ignore-loader') },
  ];
  return {
    ...options,
  };
};
