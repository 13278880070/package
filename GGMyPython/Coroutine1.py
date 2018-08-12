#!/usr/bin/env python
# -*- coding: UTF-8 -*-

# consumer() 协程(生成器)
def consumer():
	send1 = ''
	while True:
		n = yield send1
		# 从 produce 跳转来的(con.send())
		if not n:
			return
		print ('Consuming %s ' % n)
		send1 = '200 Ok'

def produce(con):
	# consumer() 就是一个生成器了
	con.send(None)
	# 启动生成器(初始化) 
	# 直到执行到 yield 跳出consumer
	n = 0
	while n<10:
		n += 1
		print ('Producing %s ' % n)
		send2 = con.send(n)
		# 调用生成器的send()方法
		# 发送完成后 进入到协程(生成器)中执行
		print ('Consumer return: %s' % send2)
	con.close()

consu = consumer()
produce(consu)

# 传统生产者-消费者模型  ---- 一个线程写消息 一个线程读消息(锁 队列)

# 此处利用协程	效率提高
# produce生产消息后 直接通过 yield 跳转到comsumer执行  
# comsumer 执行完毕 --->  produce