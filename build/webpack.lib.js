// webpack.dev.js
const merge = require('webpack-merge'); // 引入webpack-merge功能模块
const common = require('./webpack.base.js'); // 引入webpack.common.js
const commonUtils = require('./common');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require(
  'clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
//const webpack = require('webpack'); // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
//const ExtractTextPlugin = require('extract-text-webpack-plugin')
common.entry = {};
common.plugins = []
const options = require('./../phv.config');
const getConfigPlugins = function () {

  let plugins = [];
  if (options.css.extract) {

    plugins.push(new ExtractTextPlugin('[name].css'))
  }
  return plugins
}
module.exports = merge(merge(common, { // 将webpack.common.js合并到当前文件

  entry: {
    //Test: commonUtils.getSourceFile('/js/components/test.js')
  },
  output: {
    path: path.resolve(__dirname, commonUtils.getDistPath('')),
    filename: 'libs/[name].js',
    library: "[name]",
    libraryTarget: "umd"
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, './../')
    })
  ].concat(getConfigPlugins())

}), options.libraryWebpack)
