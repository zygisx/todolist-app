var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require("path");

module.exports = {
  entry: {
    app: ["whatwg-fetch", "./app/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
        {
          test: /\.js$/,
          include: `${__dirname}/app`,
          loaders: ['babel-loader']
        },
        {
          test: /\.scss$/,
          loader:  ExtractTextPlugin.extract("style","css!sass")
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }
    ]
  },
  resolve: {
  root: [
    path.resolve('./app'),
    path.resolve('./node_modules')
    ]
  },
  plugins: [
        new ExtractTextPlugin("styles.bundle.css", {
          allChunks: true
        }),
        new CopyWebpackPlugin([
          { from: 'app/index.html'}
        ])
  ]
};

console.log(`${__dirname}/app`);
