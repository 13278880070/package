#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import asyncio

async def hello(t):
	print ('Hello World! %s ' % t)
	print ('%s will wait...' % t)
	r = await asyncio.sleep(1)
	# yield from ---->  await
	# 1s   可以理解为要执行的其他函数
	print ('Hello Again! %s ' % t)

loop = asyncio.get_event_loop()
tasks = [hello(1),hello(2)]
loop.run_until_complete(asyncio.wait(tasks))
loop.close()
