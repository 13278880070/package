var mysql=require("mysql");
var connection=mysql.createConnection({
	host	: 'localhost',
	user	: 'elocutionist',
	password: '123456',
	database: 'rundata1'
});

connection.connect();

var sql='select *from register';

connection.query(sql,function(err,result){
	if(err){
		console.log('[selecr error] - ',err.message);
		return;
	}
	console.log('--------------------select----------------');
	console.log(result);
	console.log('-------------------------------------------\n\n');
	console.log("查询结束");
});

connection.end();