var mysql=require("mysql");

var connection=mysql.createConnection({
	host : 'localhost',
	user : 'elocutionist',
	password : '123456',
	database : 'student'
});

connection.connect(function(err){
	if(err){
		console.log("Error :"+err.stack);
		return;
	}else {
		console.log("Connect success");
	}
});

let sql="create table student(id int key auto_increment,name varchar(20) not null unique,chinese int not null,english int not null,math int not null)";

connection.query(sql,function(err,rows){
	if(err){
		console.log(err);
	}else {
		console.log("Create success");
	}
})