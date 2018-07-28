var express=require("express");
var app=express();
var fs=require("fs");

var id=2;
app.get("/dele",function(req,res){
	fs.readFile(__dirname+"/"+"user.json","utf8",function(err,data){
		data=JSON.parse(data);
		delete data["user2"];

		console.log(data);
		res.end(JSON.stringify(data));
	});
});

var server=app.listen(3000,function(){
	var host=server.address().address;
	var port=server.address().port;

	console.log("Server start at %s %s",host,port);
})