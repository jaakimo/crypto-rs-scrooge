interface MarketChart {
  prices: Data[];
  marketCaps: Data[];
  totalVolumes: Data[];
}

type Data = [unixTimeStamp: number, value: number];
