var originRequest = require('request')  
var cheerio = require('cheerio')  
var iconv = require('iconv-lite')  
var headers = {  
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}
var newDataStr = '';
var charset="utf-8";
var arr=responseDetail.response.body.toString().match(/<meta([^>]*?)>/g);
if(arr){
  arr.forEach(function(val){
  var match=val.match(/charset\s*=\s*(.+)\"/);
  if(match && match[1]){
  if(match[1].substr(0,1)=='"')match[1]=match[1].substr(1);
      charset=match[1].trim();
      return false;
    }
      });
    }
  var html = iconv.decode(responseDetail.response.body, charset);

  // var html = responseDetail.response.body.toString();
  var $ = cheerio.load(html);
  console.log($('head title').text())