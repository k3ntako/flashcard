var webpack = require('webpack');
let WriteFilePlugin = require('write-file-webpack-plugin');

var config = {
  entry: {
    path: './src/main.js',
  },
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new WriteFilePlugin()
  ],
  devtool: 'eval-source-map'
}

module.exports = config;
