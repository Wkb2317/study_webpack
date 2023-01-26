const path = require('path')

module.exports = {
  entry: './src/main.js', // 入口文件
  // 输出配置
  output: {
    path: path.resolve(__dirname, 'dist'), // 绝对路径
    filename: 'static/js/main.js', // 输出文件名
    clean: true, // 自动清空打包路径
  },
  // loader
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
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
          filename: 'static/img/[hash:10][ext][query]',
        },
      },
    ],
  },
  // 插件
  plugins: [],
  mode: 'development', // 模式
}
