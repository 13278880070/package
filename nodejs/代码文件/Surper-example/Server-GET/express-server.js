var express=require("express");
var app=express();

app.get('/index-1.html',function(req,res){
	res.sendFile(__dirname+"/"+"index-1.html");
});

app.get('/process_get',function(req,res){
	//输出JSON格式
	var response={
		"first_name":req.query.first_name,
		"last_name":req.query.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

var server=app.listen(3000,function(){
	var host=server.address().address;
	var port=server.address().port;

	console.log("应用实例  访问:%s %s",host,port);
})