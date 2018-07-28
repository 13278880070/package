var express = require('express');
var db=require('./../db.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var mysqlQury='select *from student';
  db.DBConnection.query(mysqlQury,function(err,rows){
  	if(err){
  		console.log(err);
  		return;
  	}
  	res.render('user',{student:rows});
  });
});

module.exports = router;