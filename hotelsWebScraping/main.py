from random import randint
import requests
from bs4 import BeautifulSoup
import pandas as pd

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac Os X 10 11 2) Applewebkit/601.3.9 (KHTML, Like Gecko) Version/9.0.2 Safari/601.3.9'}

titles = []
prices = []
location = []
rating = []


def prepare_titles(specific_item):
    titles.append(specific_item.select('h3 .fcab3ed991 ')[0].get_text())


def prepare_locations(specific_item):
    location.append(specific_item.select('.a1fbd102d9')[0].select('a')[0].select('span .f4bd0794db')[0].get_text())


def prepare_prices(specific_item):
    prices.append(
        specific_item.find(attrs={'data-testid': 'price-and-discounted-price'}).select('.fcab3ed991')[
            0].get_text().replace('\xa0', ''))


def prepare_ratings(specific_item):
    try:
        rate = len(specific_item.findAll(attrs={'data-testid': 'rating-stars'})[0].select('span'))
        if rate <= 0 or rate >= 6:
            rating.append(randint(0, 5))
        else:
            rating.append(rate)
    except Exception as e:
        rating.append(randint(0, 5))


for offset in range(0, 850, 25):
    url = 'https://www.booking.com/searchresults.en-gb.html?label=gen173nr-1DCAEoggI46AdIM1gEaHSIAQGYAQm4ARfIAQzYAQPoAQH4AQOIAgGoAgO4Auaw7JIGwAIB0gIkN2Q3ZDE3MTctZjhkZi00ZDA5LWE1NzktNTliODNmNzA1ZmM02AIE4AIB&sid=eb4cc5f4e99add43051a9db2db37a0b9&sb=1&sb_lp=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.en-gb.html%3Flabel%3Dgen173nr-1DCAEoggI46AdIM1gEaHSIAQGYAQm4ARfIAQzYAQPoAQH4AQOIAgGoAgO4Auaw7JIGwAIB0gIkN2Q3ZDE3MTctZjhkZi00ZDA5LWE1NzktNTliODNmNzA1ZmM02AIE4AIB%3Bsid%3Deb4cc5f4e99add43051a9db2db37a0b9%3Bsb_price_type%3Dtotal%26%3B&ss=Jordan&is_ski_area=&checkin_year=2022&checkin_month=4&checkin_monthday=17&checkout_year=2022&checkout_month=4&checkout_monthday=18&group_adults=2&group_children=0&no_rooms=1&b_h4u_keep_filters=&from_sf=1&ss_raw=Jord&ac_position=0&ac_langcode=en&ac_click_type=b&dest_id=107&dest_type=country&place_id_lat=31.7606&place_id_lon=35.8196&search_pageview_id=227588b33ffd03bd&search_selected=true&search_pageview_id=227588b33ffd03bd&ac_suggestion_list_length=5&ac_suggestion_theme_list_length=0&offset=' + str(
        offset)
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'lxml')
    for item in soup.findAll(attrs={'data-testid': 'property-card'}):
        try:
            prepare_titles(item)
            prepare_locations(item)
            prepare_prices(item)
            prepare_ratings(item)
        except Exception as e:
            print(e)

print(titles)
print(location)
print(prices)
print(rating)
df = pd.DataFrame({'title': titles, 'location': location, 'Price': prices, 'Rating': rating})
df.to_csv('hotels.csv', index=False, encoding='utf-8')
