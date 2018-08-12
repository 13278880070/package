#!/usr/bin/env python
# -*- coding: UTF-8 -*-

# 使用 asyncio 实现Hello world

import asyncio

@asyncio.coroutine
def wget(host):
	# host 为要访问的网站
	print ('wget %s ...' % host)
	connect = asyncio.open_connection(host,80)
	print (host,'will waiting 1 ......')
	# 可以看到每个coroutine运行到这里挂起   loop获得控制权执行其他coroutine
	reader,writer = yield from connect

	header = 'GET / HTTP/1.0\r\nHost: %s\r\n\r\n' % host
	writer.write(header.encode('utf-8'))
	yield from writer.drain()

	print (host,'will waiting 2 ......')
	# 可以看到每个coroutine运行到这里挂起   loop获得控制权执行其他coroutine
	while True:
		line = yield from reader.readline()
		# 按行 读取数据
		if line == b'\r\n':
			break
		print ('%s header > %s' % (host,line.decode('utf-8').rstrip()))
	writer.close()

loop = asyncio.get_event_loop()
tasks = [wget(host) for host in ['www.sina.com.cn', 'www.sohu.com', 'www.163.com']]
loop.run_until_complete(asyncio.wait(tasks))
loop.close()

# 三个连接 由一个线程 异步IO并发完成