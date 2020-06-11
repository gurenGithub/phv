// webpack.common.js
const path = require('path'); // 路径处理模块
//const webpack = require('webpack'); // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require(
  'html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const common = require('./common');
const entiries = common.getEntiries();
const modules = common.getViews()
const options = require('./../phv.config');

let getExtractTextPlugin = function (opts) {

  return options.css.extract ? ExtractTextPlugin.extract(opts) : opts.use

}
const getHtmlPlugins = function () {

  let plugins = [];
  Object.keys(modules).forEach(function (moduleName) {
    let config = {
      filename: moduleName + '.html',
      template: modules[moduleName],
      inject: 'body',
      chunks: [common.rebuildKey(moduleName),"main", "manifest", "vendors", "common"]
    }
    plugins.push(new HtmlWebpackPlugin(config))
  })
  return plugins;
}

module.exports = {
  entry: entiries,
  output: {
    path: path.resolve(__dirname, common.getDistPath('')),
    filename: (options.output.filename.js || 'static/js/[name].js'),
    publicPath:options.output.publicPath
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      //'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, common.getSourcePath('')),
      '@api': path.resolve(__dirname, common.getSourcePath('/api')),
      '@c': path.resolve(__dirname, common.getSourcePath('/components')),
      '@img': path.resolve(__dirname, common.getSourcePath('/assets/img')),
      '@style': path.resolve(__dirname, common.getSourcePath('/style')),
    }
  },
  module: {
    rules: [{
        test: /\.css$/, // 正则匹配以.css结尾的文件
        use: getExtractTextPlugin({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
          publicPath: '../' // 给背景图片设置一个公共路径
        })
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1000, // 限制只有小于1kb的图片才转为base64，例子图片为1.47kb,所以不会被转化
            outputPath: 'images', // 设置打包后图片存放的文件夹名称
            name: "[name].[ext]",
          }
        }]
      },
      {
        test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
        use: getExtractTextPlugin({
          fallback: 'style-loader',
          //allChunks: true,
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          publicPath: '../' // 给背景图片设置一个公共路径
        })
        /*use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
          publicPath: '../' // 给背景图片设置一个公共路径
        })
        use: ['style-loader', 'css-loader',
          'sass-loader'
        ]  需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的*/
      },
      { // jsx配置
        test: /(\.jsx|\.js)$/,
        use: { // 注意use选择如果有多项配置，可写成这种对象形式
          loader: "babel-loader"
        },
        exclude: /node_modules/ // 排除匹配node_modules模块
      }, {
        loader: 'sass-resources-loader',
        test: /\.scss$/,
        options: {
          //sourceMap: true,
          resources: [
            common.getSourceFile(
              '/style/core/helpers/core/_variables.scss'),
            common.getSourceFile('/style/core/helpers/core/_mixin.scss')
          ]
        }
      }
    ]
  },

  plugins: getHtmlPlugins().concat([])
}
