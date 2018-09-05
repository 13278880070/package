var net=require("net");

var server=net.createServer(function(socket){
	console.log("someone connect!!");
	var address=server.address();

	//发送数据给客户端
	var message="client,hello,the server address is"+JSON.stringify(address);

	socket.write(message,function(){
		var writeSize=socket.bytesWritten;
		console.log(message+"has send");
		console.log("the size of message is "+writeSize);
	});


	//获取客服端发送的数据
	socket.on('data',function(data){
		console.log(data.toString());
		var writeSize=socket.bytesRead;
		console.log("the size of message is"+writeSize);
	});


	server.maxConnections=3;
	server.getConnections(function(err,count){
		console.log("the count of client is"+count);
	});
});

server.listen(3000,function(){
	console.log("Server is listening!!");
})