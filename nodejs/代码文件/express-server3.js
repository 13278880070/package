var express=require("express");
var app=express();
var bodyParser=require("body-parser");

//创建application/x-www-form-urlencoded编码解析
var urlencodedParser=bodyParser.urlencoded({extended:false});

// app.use(express.static('public'));

app.get("/index-3.html",function(req,res){
	res.sendFile(__dirname+"/"+"index-3.html");
});

app.post("/_user",urlencodedParser,function(req,res){
	//输出JSON
	var response={
		"FirstName ":req.body.fname,
		"LastName ":req.body.lname
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

var server=app.listen(3000,function(){
	var host=server.address().address;
	var port=server.address().port;

	console.log("Server started at %s:%s",host,port);
})