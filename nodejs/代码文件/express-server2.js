var express=require("express");
var app=express();

app.get('/index-2.html',function(req,res){
	res.sendFile(__dirname+"/"+"index-2.html");
});

app.get("/form-ac",function(req,res){
	//输出JSON格式
	var json={
		"用户名: ":req.query.username,
		"密码: ":req.query.pwd
	};
	console.log(json);
	res.end(JSON.stringify(json));
});

var server=app.listen(3000,function(){
	var host=server.address().address;
	var port=server.address().port;

	console.log("Server started at: %s:%s",host,port);
});