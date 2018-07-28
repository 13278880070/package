var express = require('express');
var router = express.Router();
var request=require('request');
var cheerio=require('cheerio');
var charset='utf8';
var iconv=require('iconv-lite');
var headers = {  
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

router.get('/main',function(req,res,next){
	res.render('main',{message0:"",message1:"",message2:"",message3:""});
})

router.post('/main',function(req,res,next){
	var ipname=req.body.ipname;
	var url="http://www.ip138.com/ips138.asp?ip="+ipname+"&action=2";
	console.log(url);
	request({url,encoding:null,headers:headers},function(err1,res1,body){
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
			var message0="查询到的数据为: ";
		}else {
			console.log("无数据传入!");
		}
		res.render('main',{message0:message0,message1:message1,message2:message2,message3:message3});
	})
})

module.exports = router;
