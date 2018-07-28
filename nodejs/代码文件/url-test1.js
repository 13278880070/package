const url=require("url");
let parseUrl='http://www.baidu.com/?q=node.js';

let urlObj=url.parse(parseUrl);
console.log(urlObj);