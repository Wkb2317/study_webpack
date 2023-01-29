const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    count: path.resolve(__dirname, '../src/main.js'),
    math: path.resolve(__dirname, '../src/js/math.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    filename: '[name]-[hash:6].js',
  },
  module: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      cacheGroups: {
        default: {
          minSize: 0,
        },
      },
    },
  },
}
