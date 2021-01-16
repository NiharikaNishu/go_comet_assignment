import requests as req
import bs4
import warnings
warnings.simplefilter('ignore') 

res = req.get('https://medium.com/topic/cat') 
soup = bs4.BeautifulSoup(res.text, 'html.parser')
content = ''

if soup.find('article'):
    for i in soup.select('article'):
        content += i.getText()
        
    print(content)
