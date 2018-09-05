#!/usr/bin/env python
# -*- coding: UTF-8 -*-

# 使用 asyncio 实现Hello world

import asyncio

@asyncio.coroutine
# 把一个generator 标记为 coroutine 类型 然后扔到 EventLoop 执行
def hello():
	print ('Hello world')
	# 异步调用 asyncio.sleep(1)
	r = yield from asyncio.sleep(1)
	# asyncio.sleep() 也是一个 coroutine
	# 执行时线程不会等待该操作 而是直接中断 并执行下一个消息循环
	# 把此句看作为 耗时 一秒的操作 即可

	print ('Hello again')

# 获取 EventLoop
loop = asyncio.get_event_loop()
# 直接获取一个 EventLoop 引用

# 执行 coroute
loop.run_until_complete(hello())
# 把要执行的协程扔到 EventLoop中执行  实现异步IO

loop.close()