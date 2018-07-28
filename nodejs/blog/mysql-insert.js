var mysql=require("mysql");
var DB=require('./database');

var sql1="insert into article (articleTitle,articleAuthor,articleContent,articleTime,articleClick) values('Node.js基础知识','ZhaoKai','Node.js基础知识简要介绍......',curdate(),0)";

var sql2="insert into article (articleTitle,articleAuthor,articleContent,articleTime,articleClick) values('Node.js进阶知识','Zhangjie','Node.js进阶知识简要介绍......',curdate(),0)";

var sql3="insert into article (articleTitle,articleAuthor,articleContent,articleTime,articleClick) values('Node.js高级知识','Pengyuyan','Node.js高级知识介绍......',curdate(),0)";

var sql="use blog";
DB.query(sql);

DB.query(sql1,function(err){
	if(err){
		console.log("Error1: "+err);
	}else {
		console.log("sql1 success");
	}
})

DB.query(sql2,function(err){
	if(err){
		console.log("Error2: "+err);
	}else {
		console.log("sql2 success");
	}
})

DB.query(sql3,function(err){
	if(err){
		console.log("Error3: "+err);
	}else {
		console.log("sql3 success");
	}
})