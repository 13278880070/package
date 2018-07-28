var mysql=require("mysql");

const DB={
	host : 'localhost',
	user : 'elocutionist',
	password : '123456',
	database : 'student'
}

const DBConnection=mysql.createConnection({
	host:DB.host,
	user:DB.user,
	password:DB.password,
	database:DB.database,
	multipleStatements:true
});
DBConnection.connect();

module.exports.DBConnection=DBConnection;