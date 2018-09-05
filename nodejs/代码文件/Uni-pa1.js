var request=require("request");
var cheerio=require("cheerio");
var mysql=require("mysql");
var iconv=require("iconv-lite")

var charset='utf-8';

var url="http://www.zuihaodaxue.com/zuihaodaxuepaiming2018.html";

function getData(body){
	if(body){
		var $=cheerio.load(body);
		var target=$("[class$='_zhpm']");
		var DataList=[];
		target.find('tr').each(function(item){
			var pi=$(this);
			var Name=pi.find('td').eq(1).text();
			var Sheng=pi.find('td').eq(2).text();
			var Score=pi.find("[class$=indicator5]").text();
			DataList.push({
				Name,
				Sheng,
				Score
			});
		});
		return DataList;
	}else {
		console.log("无有效数据");
	}
}

function insertInfo(DataList){
	var connection=mysql.createConnection({
		host: 'localhost',
		user: 'elocutionist',
		password: '123456',
		database: 'Main'
	});
	connection.connect(function(err){
		if(err){
			connect.log("数据库链接错误");
			return;
		}
	});
	var sql='insert into uni(Name,Sheng,Score) values (?,?,?)';
	DataList.forEach(function(item){
		var mysqlparams=[
			item.Name,
			item.Sheng,
			item.Score
		];
		connection.query(sql,mysqlparams,function(err,rows,fields){
			if(err){
				console.log("插入数据错误: "+err);
				return;
			}
			console.log("插入数据成功");
		});
	});
}

request({url,encoding:null},function(err,response,body){
	if(!err&&response.statusCode==200){
		var arr=body.toString().match(/<meta([^>]*?)>/g);
		if(arr){
		arr.forEach(function(item){
			var match=item.match(/charset\s*=\s*(.+)\"/);
			if(match&&match[1]){
				if(match[1].substr(0,1)=='"') match[1]=match[1].substr(1);
				charset=match[1].trim();
				return false;
			}
		});
		}
		body=iconv.decode(body,charset);
		var DataList=getData(body);
		insertInfo(DataList);
	}else{
		console.log("链接出现错误");
		console.log(err);
		console.log(response.statusCode);
	}
})