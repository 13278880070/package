#!/usr/bin/env python
# -*- coding: UTF-8 -*-

# 使用 asyncio 实现Hello world
# 说明:  第一个hello()  ---->   coroutine1
# 		 asyncio.sleep ---->   coroutine2
# 		 第二个hello()  ---->   coroutine3

import threading
import asyncio

@asyncio.coroutine
# 把一个generator 标记为 coroutine 类型 扔到 EventLoop 执行
def hello(t): # t 作为标志
	print ('%s hello world! %s' % (t,threading.currentThread()))
	print (t,'will waiting ...')
	yield from asyncio.sleep(1) 
	# coroutine1 运行到这里又调用 coroutine2   I/O标记为sleep状态
	# I/O sleep时 coroutine1中断   控制权交到 loop
	# loop 拿到控制权 执行coroutine3
	# 当coroutine1  coroutine2 都挂起时 loop没有其他任务处理
	# 则loop从中断的地方重新处理 即 下面这句
	print (t,'start working ...')
	print ('%s hello again %s ' % (t,threading.currentThread()))

loop = asyncio.get_event_loop()
# 直接获取一个  EventLoop 引用

tasks = [hello(1),hello(2)]
loop.run_until_complete(asyncio.wait(tasks))
# 把要执行的协程扔到 EventLoop 执行
# 该处 两个coroutine 由一个线程并发执行

loop.close()


# 一个线程并发执行多个函数