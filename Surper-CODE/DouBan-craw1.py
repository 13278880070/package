#!/usr/bin/python
# -*- coding: UTF-8 -*-

from bs4 import BeautifulSoup
import lxml
import requests
import json

headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}
url = 'https://movie.douban.com/top250?start=25&filter='
r = requests.get(url,headers = headers)
r.encoding = r.apparent_encoding
html = r.text
# 获取 html 页面内容

soup = BeautifulSoup(html,'lxml')
divList = soup.find_all(attrs={'class':'hd'})

textList = []
for item in divList:
	litest = item.select('a span')
	text = litest[0].text
	textList.append(text)

for t in textList:
	print t