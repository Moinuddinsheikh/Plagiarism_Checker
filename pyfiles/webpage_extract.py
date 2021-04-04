import urllib.request
import re
import sys
from bs4 import BeautifulSoup
import json
from urllib.error import HTTPError

try:
   url = sys.argv[1]
   html = urllib.request.urlopen(url)
   soup = BeautifulSoup(html,"lxml")
   data = soup.findAll(text=True)

   def visible(element):
      if element.parent.name in ['style', 'script', '[document]', 'head', 'title']:
          return False
      elif re.match('<!--.*-->', str(element.encode('utf-8'))):
          return False
      return True



   result = filter(visible, data)

   res = " ".join(result)
   res = str(res)
   res += "result ::"

   json_res = {
         "page":res
      }

   with open("online_links_text.json","w") as write_file:
             json.dump(json_res,write_file)
   #print(res)
   print("yes")
except HTTPError as e:
   print("no")
