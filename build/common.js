const utils = require('./utils');
const path = require('path')
const options = require('./../phv.config');
const getSourcePath = function (path) {

  // console.log('getSourcePath')
  return `./../src${path}`
}

const getPathForIsHash=function(){

  
}

const getDistPath = function (path) {

  // console.log('getSourcePath')
  return `./../dist${path}`
}

const getSourceFile = function (file) {

  // console.log('getSourcePath')
  return path.resolve(__dirname, `./../src${file}`)
}
exports.getSourcePath = getSourcePath;
exports.getDistPath = getDistPath;
exports.getSourceFile = getSourceFile;


const rebuildKey = function (key) {
  let reKey = key; //.replace(/\//g, "_");
  return reKey
}

exports.rebuildKey = rebuildKey;
const rebuildKeys = function (objs) {


  let newobjs = {};

  for (let key in objs) {

    let reKey = rebuildKey(key);
    newobjs[reKey] = [(objs[key] || "").replace('views', 'js').replace(
      '.html', '.js')]
  }
  return newobjs
}
const getEntiries = function (isHtml) {

  const entiries = utils.getEntries(path.resolve(__dirname, utils
    .getSourcePath(
      '/views/*.html')), path.resolve(__dirname, getSourcePath(
    '/views/')), true);
  const entiries2 = utils.getEntries(path.resolve(__dirname, utils
    .getSourcePath(
      '/views/*/*.html')), path.resolve(__dirname, getSourcePath(
    '/views/')), true);

  const entiries3 = utils.getEntries(path.resolve(__dirname, utils
    .getSourcePath(
      '/views/*/*/*.html')), path.resolve(__dirname, getSourcePath(
    '/views/')), true);
  for (let key in entiries2) {
    entiries[key] = entiries2[key];
  }
  for (let key in entiries3) {
    entiries[key] = entiries3[key];
  }
  return isHtml ? entiries : rebuildKeys(entiries);
}
exports.getEntiries = getEntiries
exports.getViews = function () {

  return getEntiries(true);
}


