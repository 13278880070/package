var express = require('express');
var router = express.Router();
var crypto=require("crypto");
var mysql=require("./../database");

//首页内容
router.get('/',function(req,res,next){
	var sql="select *from article";
	mysql.query("use blog");
	mysql.query(sql,function(err,results,fields){
		if(err){
			console.log("Error: "+err);
			return;
		}
		var articles=results;
		res.render("index",{articles:articles});
		// console.log(rows[0]);
	});
});


router.get('/login',function(req, res,next) {
  // res.render('index', { title: 'Express' });
  res.render('login',{message:""});
});

router.get('/register',function(req,res,next){
	res.render('register',{emailme:"",telme:"",pwdme:""});
});

router.post('/register',function(req,res,next){
	var name=req.body.name;
	var email=req.body.email;
	if(email==""){
		emailme="邮箱不能为空";
	}else emailme="";

	var tel=req.body.tel;
	if(tel==""){
		telme="电话不能为空";
	}else telme="";

	var pwd1=req.body.password;
	var pwd2=req.body.password2;
	if(pwd1!=pwd2){
		pwdme="两次密码不一致,请重新输入";
		console.log(pwd1);
		console.log(pwd2);
	}else pwdme="";
	console.log(emailme);
	console.log(telme);
	console.log(pwdme);
	if(emailme||telme||pwdme) {
		// console.log("退回啦");
		res.render('register',{emailme:emailme,telme:telme,pwdme:pwdme});
		return;
	}
	mysql.query("use blog");
	var mysqlparams=[
		name,
		email,
		tel,
		pwd1
	];
	var mysqlQuery="insert into author (authorName,authorEmail,authorNumber,authorPassword) values(?,?,?,?)";
	mysql.query(mysqlQuery,mysqlparams,function(err,rows,fields){
		if(err){
			console.log("Error: "+err);
			return;
		}
	});

	// res.write(<script>alert("登录成功!");</script>);
	res.redirect('/login');
});

//登录身份验证
router.post('/login',function(req,res,next){
	var name=req.body.name;
	var password=req.body.password;
	// var hash=crypto.createHash('md5');
	// hash.update(password);
	// password=hash.digest('hex');
	//????
	mysql.query("use blog");
	var sql="select *from author where authorName="+mysql.escape(name)+" and authorPassword="+mysql.escape(password);
	mysql.query(sql,function(err,rows,fields){
		if(err){
			console.log(err);
			return;
		}
		var user=rows[0];
		if(!user){
			console.log(name);
			console.log(password);
			res.render('login',{message:"用户名或密码错误"});
			return;
		}
		// req.session.userSign=true;
		// req.session.userID=user.authorID;
		res.redirect('/');
		//身份验证成功
	});
})

module.exports = router;
