import random
import requests
from bs4 import BeautifulSoup
import pandas as pd

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac Os X 10 11 2) Applewebkit/601.3.9 (KHTML, Like Gecko) Version/9.0.2 Safari/601.3.9'
}

loc = pd.read_csv("hotels.csv")

setOfPlaces = set(loc['location'].tolist())

titles = []
prices = []
location = []
category = []


def prepare_titles(specific_item):
    titles.append(specific_item.get_text())


def prepare_locations():
    location.append(random.choice(tuple(setOfPlaces)))


def prepare_prices():
    prices.append(random.randint(10, 100))


def prepare_category(specific_item):
    category.append(specific_item.get_text().split(","))


for offset in range(1, 170, 1):
    url = 'https://www.talabat.com/jordan/restaurants?page=' + str(offset)
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'lxml')

    for item in soup.select('.vendorstyles__VendorContainer-sc-eu6e2y-0'):
        try:
            details = item.select('.description')[0].select('p')
            prepare_titles(details[0])
            prepare_category(details[1])
            prepare_locations()
            prepare_prices()
        except Exception as e:
            print(e)

print(titles)
print(category)
print(location)
print(prices)
df = pd.DataFrame({'title': titles, 'location': location, 'Price': prices, 'category': category})
df.to_csv('restaurants.csv', index=False, encoding='utf-8')
