var cheerio=require("cheerio");
var request=require("request");
var iconv=require("iconv-lite");

var charset='utf-8';

var url="https://list.tmall.com/search_product.htm?q=%CA%D6%BB%FA&type=p&spm=a220m.1000858.a2227oh.d100&from=.list.pc_1_searchbutton";
request({url,encoding:null},function(err,res,body){
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
	var body=iconv.decode(body,charset);
	var $=cheerio.load(body);

	console.log($("head title").text());
})