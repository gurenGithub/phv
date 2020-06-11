var path = require('path')
var glob = require('glob')
/**
 * 读取指定路径下的文件
 * @param {String} glob 表达式
 * @param {String} base 基础路径
 */
exports.getEntries = function (globPath, base, replaceed) {
  var entries = {}
  //console.log('getEntries:'+globPath)
  glob.sync(globPath).forEach(function (entry) {
    
    //获取对应文件的名称

    let viewsPath=path.join(__dirname,'../src/views');
   // console.log(viewsPath);
    var moduleName = entry.match(/(\w+).\w+$/)[1];
   // console.log(moduleName)
    if (base) {
      let temp = path.relative(base, entry)
      moduleName = temp.replace(path.extname(entry), '')
     // console.log(moduleName);
    }
    //moduleName 去掉第一次出现的replaceed字符串，并去掉所有‘\’
    if (replaceed) {
      let idx = moduleName.indexOf(replaceed)
      if (idx >= 0) {
        let pre = moduleName.substring(0, idx)
        let after = moduleName.substring(idx + replaceed.length).replace(
          /^[\\\/]*/, '')
        moduleName = pre + after
      }
    }
    //对象key中，‘\’替换成‘/’,以便插入的代码路径是‘/’
    moduleName = moduleName.replace(/\\/g, "\/");
    entries[moduleName] = entry
  })
  return entries;
}

exports.getSourcePath=function(path){

  // console.log('getSourcePath')
   return `./../src${path}`
 }
/**
 * 读取指定路径下的文件
 * @param {String} glob 表达式
 * @param {String} base 基础路径
 */
exports.getEntriesArray = function (path) {
  return getEntries(path.resolve(__dirname, getSourcePath(
    path)), path.resolve(__dirname, utils.getSourcePath(
  '/views/')), true);
}


