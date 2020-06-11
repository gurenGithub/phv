const production = process.env.npm_lifecycle_script.indexOf('production') > -
  1 //生产环境
const lib = process.env.npm_lifecycle_script.indexOf('lib') > -1 //库模式环境
//console.log(production);
module.exports = {
  css: {
    extract: lib ? false : true, //css是否提取到单独文件,
    //pattern:
  },
  chunks: true,
  output: {
    filename: {
      js: 'static/js/[name].js',
      css: 'static/css/[name].css'
    },
    publicPath: lib ? '' : production ? '' : ''
  },
  libraryWebpack: {
    entry: {
      //Test2:'./src/js/components/test.js'
    }
  },
  webpack: {
    entry: {}
  }
}
