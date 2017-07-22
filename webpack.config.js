const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/view/entry.jsx',
  ],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: '',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, './src'),
        use: [
          { loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', { modules: false }],
                ['react'],
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: '#inline-source-map',
};
