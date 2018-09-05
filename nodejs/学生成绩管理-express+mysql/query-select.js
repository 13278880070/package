var express = require('express');
var db=require('./db.js');
var bodyParser=require("body-parser");
var app=express();

let sql='select *from student';
db.DBConnection.query(sql,function(err,rows){
	if(err){
		console.log("Error :"+err.stack);
		return;
	}
	console.log(rows);
});
