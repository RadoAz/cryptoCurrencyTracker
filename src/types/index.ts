export interface Crypto {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

export interface CryptoDetails extends Crypto {
  market_data: {
    current_price: Price;
    circulating_supply: number;
    total_supply: number;
    market_cap: {
      usd: number;
    };
    ath: Price;
    atl: Price;
    total_volume: Price;
  };
}

export type Price = {[key: string]: number};
export type PriceItem = {currency: string; value: number};

export interface ChartData {
  date: string;
  price: number;
}
