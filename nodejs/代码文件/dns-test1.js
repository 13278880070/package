const dns=require("dns");
let domain="taobao.com";

dns.resolve(domain,function(err,address){
	if(err){
		console.log(err);
		return;
	}
	console.log(address);
	//address  数组
});