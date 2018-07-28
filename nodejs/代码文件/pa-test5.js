var request=require("request");
var cheerio=require("cheerio");
var iconv=require("iconv-lite");
var headers = {  
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

request({url:'http://www.baidu.com',encoding:null,headers:headers},function(err,res,body){
	if(err){
		throw err;
	}
	body=iconv.decode(body,'utf-8');
	var $=cheerio.load(body,{decodeEntities: false});
	console.log($('head title').text());
});