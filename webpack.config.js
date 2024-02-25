const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  mode: process.env.DEBUG=="1"?"development":"production",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,  path.join('assets', 'bundle')),
  },
};