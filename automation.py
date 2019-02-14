#!/usr/bin/python
import time
import sys
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from termcolor import colored
import datetime
import os
reload(sys)
sys.setdefaultencoding('utf8')

# default_image = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png'
# LIMIT = 10
#
# def update_progress(job_title, color, current, total):
# 	length = 20 # modify this to change the length
# 	progress = current/float(total)
# 	block = int(round(length*progress))
# 	msg = "\r{0}: [{1}] {2}% {3}/{4}".format(job_title, "#"*block + "-"*(length-block), round(progress*100, 2), current, total)
# 	if progress >= 1: msg += " DONE\r\n"
# 	sys.stdout.write(colored(msg, color))
# 	sys.stdout.flush()
#
# def dumpInfo(who, target, browser):
# 	print colored("dumpInfo Start ", "green"), colored(datetime.datetime.now(), "green")
# 	img = browser.find_elements_by_xpath('//div[@class="ProfileCard-content"]/a/img')
# 	screen_name = browser.find_elements_by_xpath('//div[@class="ProfileCard-userFields"]/div/div/a')
# 	name = browser.find_elements_by_xpath('//div[@class="ProfileCard-userFields"]/span/a/span/b')
# 	bio = browser.find_elements_by_xpath('//p[contains(@class, "ProfileCard-bio")]')
# 	# print(img)
# 	# print(screen_name)
# 	f= open(who+"-"+target+".json","w+")
# 	f.write('[\r\n')
# 	if(len(img) == len(screen_name) == len(name) == len(bio)):
# 		for el in range(0, len(name)):
# 			i = float(el+1)/len(name)
# 			#print i, int(i), el, len(name)
# 			update_progress("dumpInfo", "green", el, len(name))
# 			f.write('{\r\n')
# 			if(img[el].get_attribute('src') == default_image ):
# 				f.write('"image": "",\r\n')
# 			else :
# 				f.write('"image": "%s",\r\n' % img[el].get_attribute('src'))
# 			f.write('"screen_name": "%s",\r\n' % screen_name[el].text.replace('\n', ''))
# 			f.write('"name": "%s",\r\n' % name[el].text)
# 			f.write('"bio": "%s"\r\n' % bio[el].text)
# 			f.write('},\r\n')
# 		f.write(']\r\n')
# 	update_progress("dumpInfo", "green", len(name), len(name))
# 	print colored("dumpInfo Stop ", "green"), colored(datetime.datetime.now(), "green")
#
# def scrollInfinite(total, browser):
# 	print colored("scrollPage Start ", "yellow"), colored(datetime.datetime.now(), "yellow")
# 	SCROLL_PAUSE_TIME = 0.5
# 	index = 1
# 	# Get scroll height
# 	last_height = browser.execute_script("return document.body.scrollHeight")
# 	times = 0
# 	while True:
# 		# Scroll down to bottom
# 		browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
#
# 		# Wait to load page
# 		time.sleep(SCROLL_PAUSE_TIME)
#
# 		# Calculate new scroll height and compare with last scroll height
# 		new_height = browser.execute_script("return document.body.scrollHeight")
# 		if new_height == last_height and scrolled >= total:
# 			break
# 		else:
# 			index = index +1
# 			scrolled = index*18
# 			if scrolled > total:
# 				scrolled = total
# 			update_progress("scrollPage", "yellow", scrolled, total)
# 			#print colored("scrollPage Running "+str(index) + " "+str(index*18), "yellow"), colored(datetime.datetime.now(), "yellow")
# 			times = 0
# 		last_height = new_height
# 	print colored("scrollPage Stop ", "yellow"), colored(datetime.datetime.now(), "yellow")
#
# # if len(sys.argv) < 3:
# # 	print("Usage: python "+sys.argv[0]+" twitter_nickname "+"[followers|following]")
# # 	sys.exit(-1)
# # target = sys.argv[1]
# # who = sys.argv[2]
# # if who != "followers" and who != "following":
# # 	print("Usage:\t python "+sys.argv[0]+" "+sys.argv[1]+" followers")
# # 	print("\t or ")
# # 	print("\t python "+sys.argv[0]+" "+sys.argv[1]+" following")
# # 	sys.exit(-1)
# def login(username):
# 	# Creating an instance webdriver
# 	browser = webdriver.Chrome()
# 	browser.get('https://www.twitter.com/login')
#
# 	# Let's the user see and also load the element
# 	time.sleep(1)
#
# 	#login = browser.find_elements_by_xpath('//*[@id="doc"]/div[1]/div/div[1]/div[2]/a[3]')
#
# 	# using the click function which is similar to a click in mouse.
# 	#login[0].click()
#
#
#
# def scrollAndDump(browser, target, who):
# 	print('\r\n')
# 	browser.get('https://www.twitter.com/'+target+'/'+who+'/')
# 	time.sleep(1)
# 	print colored(who, 'blue')
# 	tot = browser.find_elements_by_xpath('//li[contains(@class, "ProfileNav-item") and contains(@class, "is-active")]/a/span[@class="ProfileNav-value"]')
# 	total = int(tot[0].text.replace(".",""))
# 	scrollInfinite(total, browser)
# 	dumpInfo(who, target, browser)
#
# def dumpUser(browser, target):
# 	os.mkdir( './'+target, 0755 )
# 	os.chdir(target)
# 	scrollAndDump(browser, target, 'following')
# 	scrollAndDump(browser, target, 'followers')
#
def optbuilding(browser):
    time.sleep(1)
    building = browser.current_url
    browser.execute_script("window.open('"+building+"');")
    browser.switch_to.window(browser.window_handles[-1])
    addFloor = browser.find_elements_by_xpath('/html/body/div/div[1]/div/div/div/div/button[1]')[0]
    addFloor.click()
    time.sleep(2)
    browser.execute_script("window.open('"+building+"');")
    browser.switch_to.window(browser.window_handles[-1])
    floorList = browser.find_elements_by_xpath('/html/body/div/div[1]/div/div/div/div/button[2]')[0]
    floorList.click()
    time.sleep(2)

    #browser.execute_script("window.history.go(-1)")
    #browser.switch_to.window(browser.window_handles[1])

def building(browser, index):
    browser.execute_script("window.open('http://localhost:3000/#/buildings');")
    time.sleep(3)
    browser.switch_to.window(browser.window_handles[-1])
    bList = browser.find_elements_by_xpath('/html/body/div/div[1]/div/div/table/tbody//td[4]/button')
    bList[index].click()
    time.sleep(1)
    optbuilding(browser)

    #return browser

def buildings(browser):
    browser.get('http://localhost:3000/#/buildings')
    bList = browser.find_elements_by_xpath('/html/body/div/div[1]/div/div/table/tbody//td[4]/button')
    nB = len(bList)
    for i in range(0, nB):
        time.sleep(1)
        building(browser, i)

def login(browser):
    browser.get('http://localhost:3000/#/login')
    user = browser.find_element_by_xpath('//*[@id="username"]')
    # Enter User Name
    user.send_keys('nat')

    user = browser.find_element_by_xpath('//*[@id="password"]')

    user.send_keys('ciao')

    LOG = browser.find_elements_by_xpath('/html/body/div/div[1]/div/div/button')[0]
    LOG.click()
    buildings(browser)
    #return browser

browser = webdriver.Chrome()

# Let's the user see and also load the element
time.sleep(1)
login(browser)
