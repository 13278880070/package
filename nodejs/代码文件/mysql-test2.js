const mysql=require('mysql');

//创建连接
const connection=mysql.createConnection({
	host: 'localhost',
	user: 'elocutionist',
	password: '123456',
	database: 'rundata1'
});

//连接mysql
connection.connect(function(err){
	if(err){
		console.error("Error connecting :"+err.stack);
		return ;
	}
	console.log("connected as id "+connection.threadId);
	//											???

});

// const table='register';
//查询数据
connection.query('select *from register',function(err,rows){
	if(err){
		console.log(err);
	}else {
		console.log(rows[0]);
		console.log(rows[1]);
	}
});

connection.end();