var http=require("http");
var cheerio=require("cheerio");

var url="http://www.ziroom.com";

//过滤页面数据
function fileList(html){
	if(html){
		var $=cheerio.load(html);
		var slideList=$("#foucsSlideList");
		var slideListData=[];

		slideList.find('li').each(function(item){
			var pic=$(this);
			var pic_href=pic.find('a').attr('href');
			var pic_src=pic.find('a').children('img').attr('_src');
			var pic_message=pic.find('a').children('img').attr('alt');
			slideListData.push({
				pic_href: pic_href,
				pic_message: pic_message,
				pic_src: pic_src
			});
		});
		return slideListData;
	}else {
		console.log("无数据传入");
	}
}

//打印页面数据
function printinfo(slideListData){
	var count=0;
	slideListData.forEach(function(item){
		//获取图片
		var pic_src=item.pic_src;
		//链接
		var pic_href=item.pic_href;
		//图片信息
		var pic_message=item.pic_message;

		//打印
		console.log("第"+(++count)+"张图片");
		console.log(pic_message);
		console.log(pic_href);
		console.log(pic_src);
		console.log("\n");
	});
}

http.get(url,function(res){
	var html="";
	//获取页面数据
	res.on('data',function(chunk){
		html+=chunk;
	});
	//数据获取结束
	res.on('end',function(){
		//过滤页面信息
		var slideListData=fileList(html);
		//打印信息
		printinfo(slideListData);
	});
}).on('err',function(){
	console.log("获取数据出错");
});