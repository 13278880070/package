#!/usr/bin/python
# -*- coding: UTF-8 -*-

from multiprocessing import Process,Lock,Queue
import time,os
from bs4 import BeautifulSoup
import lxml,requests

headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}

urlList = []

def craw(url,q,count):
	print 'Process ',os.getpid(),'is working'
	r = requests.get(url,headers = headers)
	r.encoding = r.apparent_encoding
	html = r.text
	soup = BeautifulSoup(html,'lxml')
	divList = soup.find_all(attrs={'class':'hd'})
	scoreList = soup.find_all(attrs={'class':'rating_num'})
	for i in range(len(divList)):
		spans = divList[i].select('a span')
		text = spans[0].text
		score = scoreList[i].text
		q.put(str(count)+'\t'+str(score)+'\t'+text)
		# 将count 转化为str类型 加入到队列
		count += 1

urlList.append('https://movie.douban.com/top250?start=0&filter=')
for page in range(1,11):
	url = 'https://movie.douban.com/top250?start='+str(25*page)+'&filter='
	urlList.append(url)
	# 生成要爬取的

if __name__ == '__main__':
	q = Queue()
	# 创建一个队列来保存进程执行中获取到的数据(电影名称 评分)
	start = time.time()
	print 'Parent process %s ' % os.getpid()
	Process_list = []
	count = -24
	for i in range(9):
		count += 25
		# 开启 8 个进程来爬取网站
		p = Process(target = craw,args = (urlList[i],q,count,))
		p.start()
		# 创建并启动进程
		Process_list.append(p)
	for item in Process_list:
		item.join()
	# 主进程的阻塞 等待子进程的退出

	end = time.time()
	while not q.empty():
		print q.get()
	print 'Time: ',end-start
	# 计算得出多进程所花费的时间