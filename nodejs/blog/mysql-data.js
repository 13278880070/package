var mysql=require("mysql");
var DB=require('./database');

var sql1='use blog';
var sql2='create table author(authorID int primary key auto_increment,authorNumber varchar(12),authorEmail varchar(20),authorName varchar(20) not null unique,authorPassword varchar(32) not null)';
var sql3='create table article(articleID int primary key auto_increment,articleTitle varchar(100) not null unique,articleAuthor varchar(20) not null,articleContent longtext not null,articleTime date not null,articleClick int default 0)';

DB.query(sql1,function(err1){
	if(err1){
		console.log("Error1: "+err1);
	}
	else console.log("sql1 success");
});
	
DB.query(sql2,function(err2){
	if(err2){
		console.log("Error2: "+err2);
	}
	else console.log("sql2 success");
});
DB.query(sql3,function(err3){
	if(err3){
		console.log("Error3: "+err3);
	}
	else console.log("sql3 success");
});