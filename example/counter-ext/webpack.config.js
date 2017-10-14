const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './src/app.js',
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: '.',
    inline: true,
    host: '127.0.0.1',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8081'
      },
      '/': {
        target: 'http://localhost:8081'
      }
    },
    stats: {
      version: false,
      hash: false,
      chunkModules: false
    }
  },
  plugins: [
  ],
  devtool: 'source-map'
};
