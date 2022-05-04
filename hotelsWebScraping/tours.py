from random import randint
import requests
from bs4 import BeautifulSoup
import pandas as pd

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac Os X 10 11 2) Applewebkit/601.3.9 (KHTML, Like Gecko) Version/9.0.2 Safari/601.3.9'}

titles = []
prices = []
rating = []


def prepare_titles(specific_item):
    titles.append(specific_item.select('.product-card-row-title a')[0].get_text())


def prepare_prices(specific_item):
    prices.append(
        specific_item.select('.price-font')[0].get_text())


def prepare_ratings(specific_item):
    try:
        rating.append(
            specific_item.findAll(attrs={'aria-labelledby': 'title'})[0].select('title')[0].get_text().replace('star-',
                                                                                                               ''))
    except Exception as e:
        rating.append(randint(0, 5))


for offset in range(1, 11, 1):
    offset_str = str(offset)
    if offset == 1:
        offset_str = ''
    url = 'https://www.viator.com/Jordan-tours/Day-Trips-and-Excursions/d744-g5?' + offset_str + 'dynamicFilters=TAG-12029'
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'lxml')
    for item in soup.findAll(attrs={'data-test-selector': 'product-item'}):
        try:
            prepare_titles(item)
            prepare_ratings(item)
            prepare_prices(item)
        except Exception as e:
            print(e)

print(titles)
print(prices)
print(rating)
df = pd.DataFrame({'title': titles, 'Price': prices, 'Rating': rating})
df.to_csv('tours.csv', index=False, encoding='utf-8')
