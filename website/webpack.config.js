const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SizePlugin = require('size-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/index'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'main.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // }
    ]
  },
  plugins: [
    new SizePlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    contentBase: './',
    historyApiFallback: true,
    port: 5000
  }
};
