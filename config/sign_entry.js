const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    // 入口打包后文件命名
    filename: 'js/[name]-[hash:6].js',
    // 其他资源打包资源
    chunkFilename: 'js/[name]-[hash:6].js',
  },
  module: {

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      // cacheGroups: {
      //   default: {
      //     minSize: 0,
      //   },
      // },
    },
  },
}
