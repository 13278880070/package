const dns=require("dns");

dns.reverse('192.168.1.202',function(err,domain){
	if(err){
		console.log(err);
		return;
	}
	console.log(domain);
})