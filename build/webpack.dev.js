// webpack.dev.js
const merge = require('webpack-merge'); // 引入webpack-merge功能模块
const common = require('./webpack.base.js'); // 引入webpack.common.js
const commonUtils = require('./common');
const webpack = require('webpack'); // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const options = require('./../phv.config');
const getConfigPlugins = function () {

  let plugins = [];
  if (options.css.extract) {
    plugins.push(new ExtractTextPlugin('[name].css'))
  }
  return plugins
}
module.exports = merge(common, { // 将webpack.common.js合并到当前文件
  devServer: {
    contentBase: commonUtils.getDistPath(''), // 本地服务器所加载文件的目录
    port: "8088", // 设置端口号为8088
    inline: true, // 文件修改后实时刷新
    historyApiFallback: true, //不跳转
    hot: true //热加载
  },
  plugins: getConfigPlugins().concat([
    new webpack.HotModuleReplacementPlugin(),
  ])

})
