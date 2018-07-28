var request=require("request");
var express=require("express");
var cheerio=require("cheerio");
var iconv=require("iconv-lite");
var charset='utf8';
var router=express.Router();

var app=express();

router.get('/url-set',function(req,res,next){
	res.render('url-set',{message1:"",message2:"",message3:""});
})

router.post('/url-set',function(req,res,next){
	var ipname=req.body.ipname;
	var url="view-source:http://www.ip138.com/ips138.asp?ip="+ipname+"&action=2";
	request({url,encoding:null},function(err,res,body){
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
		}else {
			console.log("无数据传入!");
		}
		res.render('/url-set',{message1:message1,message2:message2,message3:message3});
	})
})

app.set('view engine','jade');
app.use('/',router);

var server=app.listen(3000,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("Server started at :"+port);
})