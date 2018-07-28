var mysql=require("mysql");

//创建连接
var connection=mysql.createConnection({
	host : 'localhost',
	user : 'elocutionist',
	password : '123456',
	database : 'rundata1'
});

connection.connect(function(err){
	if(err){
		console.log("Error :"+err.stack);
		return;
	}
	console.log("Connected as id "+connection.threadId);
});

let sql="create database student";
connection.query(sql,function(err,rows){
	if(err){
		console.log(err);
	}else {
		console.log("Create suncces");
	}
})