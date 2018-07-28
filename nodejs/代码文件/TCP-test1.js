var net=require("net");

var server=net.createServer(function(socket){
	console.log("there is someone connect!!");
});

server.listen(3000,function(){
	console.log("Server is listening");
});