var originRequest = require('request')  
var cheerio = require('cheerio')  
var iconv = require('iconv-lite')  
var charset="utf-8";
function request (url, callback) { 
  var options = {
    url: url,
    encoding: null,
  }
  originRequest(options, callback)
}
var url = 'https://list.tmall.com/search_product.htm?q=%CA%D6%BB%FA&type=p&spm=a220m.1000858.a2227oh.d100&from=.list.pc_1_searchbutton'
request(url, function (err, res, body) {
    var arr=body.toString().match(/<meta([^>]*?)>/g);
    if(arr){
    arr.forEach(function(val){
    var match=val.match(/charset\s*=\s*(.+)\"/);
    if(match && match[1]){
    if(match[1].substr(0,1)=='"') match[1]=match[1].substr(1);
      charset=match[1].trim();
      return false;
    }
      });
    }
    var html = iconv.decode(body, charset);
    var $ = cheerio.load(html);
    console.log($('head title').text())
});