const path = require('path');
const UglifyJS = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const PRODUCTION = process.env.NODE_ENV === 'production';

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
  devtool: PRODUCTION ? false : '#inline-source-map',
};
