var express = require('express');
var request=require('request');
var cheerio=require('cheerio');
var charset='utf8';
var iconv=require('iconv-lite');
var headers = {  
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}
var url="http://www.ip138.com/ips138.asp?ip=baidu.com&action=2";
request({url,encoding:null,headers:headers},function(err,res,body){
	if(err){
		console.log(err);
		console.log(res.statusCode);
		return;
	}
	var arr=body.toString().match(/<meta([^>]*?)>/g);
	if(arr){
		arr.forEach(function(item){
			var match=item.match(/charset\s*=\s*(.+)\"/);
			if(match&&match[1]){
				if(match[1].substr(0,1)=='"') match[1]=match[1].substr(1);
				charset=match[1].trim();
				return false;
			}
		});
	}
	body=iconv.decode(body,charset);
	var $=cheerio.load(body);
	if(body){
		var message1=$(".ul1").find("li").eq(0).text();
		var message2=$(".ul1").find("li").eq(1).text();
		var message3=$(".ul1").find("li").eq(2).text();
		console.log("查询到的数据为: ");
		console.log(message1+"  "+message2+"  "+message3);
	}else {
		console.log("无数据传入!");
	}
})