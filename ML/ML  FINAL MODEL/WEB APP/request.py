import requests

url = 'http://localhost:5000/results'
r = requests.post(url,json={'Text':"adadasd"})

print(r.json())

