const mysql=require("mysql");

//创建连接
const connection=mysql.createConnection({
	host : 'localhost',
	user : 'elocutionist',
	password : '123456',
	database : 'rundata1'
});

//连接mysql
connection.connect(function(err){
	if(err){
		console.log("Error: "+err.stack);
		return ;
	}
	console.log("Connected as id"+connection.threadId);
});

//定义mysql语句
let sql='select *from register where username='+connection.escape(username);
//通过 escape()方法  防止sql注入攻击

//执行sql语句
connection.query(sql,function(err,rows){
	if(err){
		console.log(err);
	}else {
		console.log(rows);
	}
});