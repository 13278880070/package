#!/usr/bin/python
# -*- coding: UTF-8 -*-

import MySQLdb
from bs4 import BeautifulSoup
import lxml
import requests

contentList = []	# 电影名称
scoreList = []		# 评分
scorenumList = []	# 评分人数
rankingList = []	# 排名
count = 1
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}

# 爬取得到电影名称 和 评分  自动排名  评分人数
def craw(url):
	r = requests.get(url,headers = headers)
	r.encoding = r.apparent_encoding
	html = r.text
	# 解析html
	soup = BeautifulSoup(html,'lxml')
	divList = soup.find_all(attrs={'class':'hd'})
	spanList = soup.find_all(attrs={'class':'rating_num'})
	numList = soup.find_all(attrs={'class':'star'})
	for i in range(len(divList)):
		global count
		rankingList.append(count)
		count += 1
		# 电影排名
		spans = divList[i].select('a span')
		text = spans[0].text
		contentList.append(text)
		# 电影名称
		score = spanList[i].text
		scoreList.append(score)
		# 电影评分
		nums = numList[i].select('span')
		scorenum = nums[-1].text
		scorenumList.append(scorenum)
		# 评分人数


urllist = []
urllist.append('https://movie.douban.com/top250?start=0&filter=')
for i in range(1,11):
	url = 'https://movie.douban.com/top250?start='+str(i*25)+'&filter='
	urllist.append(url)

for url in urllist:
	craw(url)
	# 对每一个url 执行爬取函数

db = MySQLdb.connect('localhost','elocutionist','123456','main',charset = 'utf8')
cursor = db.cursor()
# 获得游标

for i in range(len(contentList)):
	sql = 'insert into douban(ranking,moviename,score,scorenum) values('+str(rankingList[i])+",'"+contentList[i]+"',"+str(scoreList[i])+",'"+scorenumList[i]+"')"
	try:
		cursor.execute(sql)
		db.commit()
		# 提交到数据库执行
		print 'success'
	except:
		print i,' there is a Error'