from django.views.decorators.cache import cache_page
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import extra
import requests
import json
import datetime


CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)


@cache_page(CACHE_TTL)
@api_view(["GET"])
def data(request):

    print("Computing")
    timedelta = request.query_params.get('timedelta', None)
    date = (datetime.datetime.now() - datetime.timedelta(hours=int(timedelta))).strftime("%Y-%m-%dT%H:%M:%S")

    response = requests.get('https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/history?',
                            params={'period_id': '1HRS', 'time_start': date},
                            headers={"X-CoinAPI-Key": "A68CBE61-BB57-47C5-911D-8E63EBF36346"})

    data = json.loads(response.text)

    linear_reg = extra.linear_reg(data)

    for index, lg in enumerate(linear_reg):
        data[index]["linear_reg"] = lg

    return Response(data)
