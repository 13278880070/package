const url='https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&fm=index&pos=history&word=%E8%BF%AA%E4%B8%BD%E7%83%AD%E5%B7%B4';
const path=require('path');
const imgDir=path.join(__dirname,'img');

module.exports.url=url;
module.exports.imgDir=imgDir;