const path = require('path')
const os = require('os')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

// cpu核数量
const threads = os.cpus().length

function getStyleLoader(preset) {
  return [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', preset].filter(Boolean)
}

module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'), // 入口文件
  // 输出配置
  output: {
    path: path.resolve(__dirname, '../dist'), // 绝对路径
    filename: 'js/main.js', // 输出文件名
    clean: true, // 自动清空打包路径
  },

  // loader
  module: {
    rules: [{
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
      template: path.resolve(__dirname, '../public/index.html'), // 模板路径
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css', //  CSS 提取到单独的文件
    }),
    new CssMinimizerPlugin(), // 压缩css
    new TerserPlugin({
      parallel: threads,
    }),
  ],
  optimization: {
    minimizer: [
      // 压缩图片
      // 没用，增加打包时间，依赖还下载不下来
      // new ImageMinimizerPlugin({
      //   minimizer: {
      //     implementation: ImageMinimizerPlugin.imageminGenerate,
      //     options: {
      //       plugins: [
      //         ['gifsicle', { interlaced: true }],
      //         ['jpegtran', { progressive: true }],
      //         ['optipng', { optimizationLevel: 5 }],
      //         [
      //           'svgo',
      //           {
      //             plugins: [
      //               'preset-default',
      //               'prefixIds',
      //               {
      //                 name: 'sortAttrs',
      //                 params: {
      //                   xmlnsOrder: 'alphabetical',
      //                 },
      //               },
      //             ],
      //           },
      //         ],
      //       ],
      //     },
      //   },
      // }),
    ],
  },
  mode: 'production', // 生产模式
  devtool: 'source-map',
}
