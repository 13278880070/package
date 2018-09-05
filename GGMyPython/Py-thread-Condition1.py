#!/usr/bin/python
# -*- coding: UTF-8 -*-

import threading
import time

# 商品
product = None
# 条件变量(线程池)
con = threading.Condition()

# 生产者方法
def produce():
	global product

	if con.acquire():
		# 锁定
		while True:
			if product is None:
				# 开始生产
				print ('produce...')
				product = 'anything'

				# 通知消费者 商品已经生产好
				con.notify()

			# 等待通知
			con.wait()
			time.sleep(2)

# 消费者方法
def consume():
	global product

	if con.acquire():
		while True:
			if product is not None:
				# 开始消费
				print ('consume...')
				product = None

				# 通知生产者  商品消费完
				con.notify()

			# 等待通知
			con.wait()
			time.sleep(2)

# 创建两个线程
t1 = threading.Thread(target=produce)
t2 = threading.Thread(target=consume)

t1.start()
t2.start()