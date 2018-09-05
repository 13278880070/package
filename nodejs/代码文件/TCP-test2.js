var net=require("net");

var server=net.createServer(function(socket){
	console.log("someone connected!!");
});

server.listen(3000,function(){
	var address=server.address();
	console.log(address.address);
	console.log(address.port);
	console.log(address.family);
})