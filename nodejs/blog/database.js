const mysql=require("mysql");
const config=require('./config');

const database=mysql.createConnection({
	host: config.host,
	port: config.port,
	user: config.user,
	password: config.password
});

database.connect();

module.exports=database;