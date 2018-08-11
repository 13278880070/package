#!/usr/bin/python
# -*- coding: UTF-8 -*-

from bs4 import BeautifulSoup
import lxml
import requests

headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}

textList = []
scoreList = []

def craw(url):			#  爬取电影名称
	r = requests.get(url,headers = headers)
	r.encoding = r.apparent_encoding
	html = r.text
	# 获取html 页面代码
	soup = BeautifulSoup(html,'lxml')
	divList = soup.find_all(attrs={'class':'hd'})
	spanList = soup.find_all(attrs={'class':'rating_num'})
	for item in divList:
		telist = item.select('a span')
		global textList
		textList.append(telist[0].text)
	for item in spanList:
		scoreList.append(item.text)

url = 'https://movie.douban.com/top250?start=25&filter='
urlList = []
for page in range(1,11):
	url = 'https://movie.douban.com/top250?start='+str(25*page)+'&filter='
	urlList.append(url)

for i in urlList:
	craw(i)

resultList = []
# 要打印的结果  将电影名与评分 连接
for i in range(len(textList)):
	# resultList[i] = textList[i]+'   '+str(scoreList[i])
	# print resultList[i]
	print i,"   ",scoreList[i],'   ',textList[i]