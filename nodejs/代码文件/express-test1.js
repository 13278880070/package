var express=require("express");
var app=express();

app.get('/',function(req,res){
	res.send('Hello world!');
})

var server=app.listen(3000,function(){
	var host=server.address().address;
	var port=server.address().port;

	console.log("应用实例: 访问:http:192.198.1.202//%s:%s",host,port);
});