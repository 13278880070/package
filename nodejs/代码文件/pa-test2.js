// var http=require("http");
var cheerio=require("cheerio");
var request=require("request");

var url="https://list.tmall.com/search_product.htm?q=%CA%F3%B1%EA&type=p&spm=a220m.1000858.a2227oh.d100&from=.list.pc_1_searchbutton";

request(url,function(err,response,body){
	console.log(response.statusCode);
	if(!err&&response.statusCode==200){
		var $=cheerio.load(body);
		var List=$("#J_RelSearch");
		var ListData=[];
		List.find('a').each(function(item){
			var pick=$(this);
			var href=pick.attr('href');
			// var title=pick.attr('title');
			console.log(href);
			// console.log(title);
		})
		// List.each(function(item){
		// 		var title=item.find('a').attr('title');
		// 		var href=item.find('a').attr('href');
		// 		console.log(title);
		// 		ListData.push({
		// 			title,
		// 			href
		// 		});
		// 	});
		// ListData.forEach(function(item){
		// 	var gootitle=item.title;
		// 	var goodhref=item.href;
		// 	console.log(gootitle);
		// 	console.log(goodhref);
		// });
	}
	else{
		console.log("获取失败");
	}
});