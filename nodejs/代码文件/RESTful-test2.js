var express=require("express");
var app=express();
var fs=require("fs");

app.get('/:id',function(req,res){
	fs.readFile(__dirname+"/"+"user.json","utf8",function(err,data){
		//读取用户数据
		data=JSON.parse(data);
		var user=data['user'+req.params.id];
		//req.params  获取路由的parameters
		console.log(user);
		res.end(JSON.stringify(user));
	});
});

var server=app.listen(3000,function(){
	var host=server.address().address;
	var port=server.address().port;

	console.log("Server started at %s %s",host,port);
})