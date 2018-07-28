var DB=require("./database");

var sql="use blog";
DB.query(sql);
var sql1="select *from article";

DB.query(sql1,function(err,rows,fields){
	if(err){
		console.log("Error: "+err);
		return;
	}
	console.log(rows[0]);
})