var express=require("express");
var app=express();
var fs=require("fs");

//添加新用户
var user={
	"user4" : {
		"name" : "mohit",
		"password" : "password4",
		"profession" : "teacher",
		"id" : 4
	}
}


app.get('/listUsers',function(req,res){
	fs.readFile(__dirname+"/"+"users.json","utf8",function(err,data){
		//读取已存在文件中的数据
		data=JSON.parse(data);
		//添加数据
		data['user4']=user['user4'];
		console.log(data);
		res.end(JSON.stringify(data));
	});
});

var server=app.listen(3000,function(){
	var host=server.address().address;
	var port=server.address().port;

	console.log("Server start at :%s %s",host,port);
});