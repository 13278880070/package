var express=require("express");
var app=express();
var fs=require("fs");

var bodyParser=require("body-parser");
var multer=require("multer");

app.use(express.static('public'));
//托管静态文件
app.use(bodyParser.urlencoded({entended: false}));
app.use(multer({dest: '/tmp/'}).array('image'));

app.get('/index-up.html',function(req,res){
	res.sendFile(__dirname+"/"+"index-up.html");
});

app.post('/file_upload',function(req,res){
	console.log(req.files[0]);
	//上传的文件信息

	var des_file=__dirname+"/"+req.files[0].originalname;
	fs.readFile(req.files[0].path,function(err,data){
		if(err){
			console.log(err);
		}
		else {
			response={
				message: "File uploaded successFully",
				filename:req.files[0].originalname
			};
		}
		console.log(response);
		res.end(JSON.stringify(response));
	});
});

var server=app.listen(3000,function(){
	var host=server.address().address;
	var port=server.address().port;

	console.log("Server started at %s :%s",host,port);
});