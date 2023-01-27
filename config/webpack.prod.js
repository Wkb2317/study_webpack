const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

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
    rules: [
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
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env'],
          // },
        },
      },
    ],
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
    new CssMinimizerPlugin(),
  ],
  mode: 'production', // 模式
  devtool: 'source-map',
}
