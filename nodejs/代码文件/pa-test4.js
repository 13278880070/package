var request=require("request");
var cheerio=require("cheerio");
var iconv=require("iconv-lite");
var charset='utf-8';

var url="https://list.tmall.com/search_product.htm?q=%CA%D6%BB%FA&type=p&spm=a220m.1000858.a2227oh.d100&from=.list.pc_1_searchbutton";

//过滤页面数据
function GLData(body){
	if(body){
		var $=cheerio.load(body);
		var target1=$("[class$='productTitle-spu']");
		var target2=$(".productPrice");
		var goodname=[];
		var goodprice=[];
		console.log("action！");
		target1.each(function(item){
			var pick=$(this);
			var title=pick.find('a').attr("title");
			goodname.push({
				title
			});
		});
		target2.each(function(item){
			var pick=$(this);
			var price=pick.find("em").attr("title");
			goodprice.push({
				price
			});
		});
		goodname.forEach(function(item){
			console.log("商品名称: "+item.title);
		});
		goodprice.forEach(function(item){
			console.log("商品价格: "+item.price);
		});
	}else {
		console.log("获取数据失败");
	}
}

request({url,encoding:null},function(err,response,body){
	if(!err&&response.statusCode==200){
		var arr=body.toString().match(/<meta([^>]*?)>/g);
	    if(arr){
	    arr.forEach(function(val){
	    var match=val.match(/charset\s*=\s*(.+)\"/);
	    if(match && match[1]){
	    if(match[1].substr(0,1)=='"')match[1]=match[1].substr(1);
	      charset=match[1].trim();
	      return false;
	    }
	      });
	    }
		body=iconv.decode(body,charset);
		GLData(body);
	}else {
		console.log(err);
		console.log(response.statusCode);
		console.log("链接错误");
	}
})