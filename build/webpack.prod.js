// webpack.prod.js
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const CleanWebpackPlugin = require(
  'clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
const path = require('path');
/*const PurifyCssWebpack = require('purifycss-webpack'); // 引入PurifyCssWebpack插件
const glob = require('glob'); // 引入glob模块,用于扫描全部html文件中所引用的css
const commonUtils = require('./common');
const webpack = require('webpack'); // 这个插件不需要安装，是基于webpack的，需要引入webpack模块*/


const ExtractTextPlugin = require('extract-text-webpack-plugin')

const options = require('./../phv.config');
const getConfigPlugins = function () {

  let plugins = [];
  if (options.css.extract) {

    plugins.push(new ExtractTextPlugin(
      options.output.filename.css ||
      '/static/css/[name].css'))
  }
  return plugins
}
const members = merge(common, { // 将webpack.common.js合并到当前文件
  devtool: false, // 'source-map',  // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
  plugins: getConfigPlugins().concat([

    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, './../')
    })

    // 所要清理的文件夹名称
    /*new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname,
        commonUtils.getSourcePath('/*.html'))
        ) // 同步扫描所有html文件中所引用的css
    })*/
  ]),
  optimization: options.chunks ? {
    splitChunks: {
      cacheGroups: {
        //打包公共模块
        common: {
          chunks: 'initial', //initial表示提取入口文件的公共部分
          minChunks: 2, //表示提取公共部分最少的文件数
          minSize: 0, //表示提取公共部分最小的大小
          name: 'common' //提取出来的文件命名
        }
      }
    }
  } : {}
})

merge(members, options.webpack);


module.exports = members
