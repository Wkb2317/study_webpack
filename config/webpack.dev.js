const os = require('os')
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

// cpu核数量
const threads = os.cpus().length

function getStyleLoader(preset) {
  return [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', preset].filter(Boolean)
}

module.exports = {
  entry: './src/main.js', // 入口文件
  // 输出配置
  output: {
    path: undefined,
    // path: path.resolve(__dirname, '../dist'), // 绝对路径
    filename: 'js/main.js', // 输出文件名
    // clean: true, // 自动清空打包路径
  },
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true,
  },
  // loader
  module: {
    rules: [{
      // 只被一个loader处理后不再继续往下
      oneOf: [
        {
          test: /\.css$/i,
          use: getStyleLoader(),
        },
        {
          test: /\.less$/i,
          use: getStyleLoader('less-loader'),
        },
        {
          test: /\.s[ac]ss$/i,
          use: getStyleLoader('sass-loader'),
        },
        {
          test: /\.styl$/,
          use: getStyleLoader('stylus-loader'),
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // 图片转base64
            },
          },
          generator: {
            // 输出文件名称
            filename: 'img/[hash:10][ext][query]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|mp3|mp4)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash:10][ext][query]',
          },
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'thread-loader',
              options: {
                workers: threads,
              },
            },
            {
              loader: 'babel-loader',
              // options: {
              //   presets: ['@babel/preset-env'],
              // },
              options: {
                cacheDirectory: true, // 开启缓存
                cacheCompression: false, // 开启压缩
                plugins: ['@babel/plugin-transform-runtime'], // 减少代码体积
              },
            },
          ],

        },
      ],
    }],
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      threads: true, // 开启多线程
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
    new TerserPlugin({
      parallel: threads,
    }),
  ],
  mode: 'development', // 开发模式
  devtool: 'cheap-module-source-map',
}
