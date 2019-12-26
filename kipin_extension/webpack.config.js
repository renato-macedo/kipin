const path = require('path');
const SizePlugin = require('size-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  stats: 'errors-only',
  entry: {
    content: './src/content',
    background: './src/background'
    // options: './src/options'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
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
  plugins: [
    new SizePlugin(),
    new CopyPlugin(
      [
        {
          from: '*',
          context: 'src'
        }
      ],
      { ignore: ['*.js'] }
    )
  ]
};
