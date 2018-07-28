var request=require("request");

function getHtmlByUrl(href){
	request(href,function(err,response,body){
		if(err&&response.statusCode==200){
			console.log("数据获取失败");
		}else {
			console.log(body);
		}
	});
}

getHtmlByUrl("https://www.baidu.com");