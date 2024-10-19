import axios from 'axios';
import {Crypto, CryptoDetails, ChartData} from '../types';

export const fetchCryptos = async (page: number): Promise<Crypto[]> => {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets',
    {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page,
      },
    },
  );
  return response.data;
};

export const fetchDetails = async (id: string): Promise<CryptoDetails> => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}`,
  );
  return response.data;
};

export const fetchSearchResults = async (query: string): Promise<Crypto[]> => {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets',
    {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
      },
    },
  );

  const filteredCoins = response.data.filter(
    (coin: Crypto) =>
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase()),
  );

  return filteredCoins;
};

export const fetchCryptoPriceChartData = async (
  coinId: string,
  currency: string,
): Promise<ChartData[]> => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
    {
      params: {
        vs_currency: currency,
        days: 30,
      },
    },
  );
  return response.data.prices.map(([timestamp, price]: [number, number]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    price,
  }));
};
