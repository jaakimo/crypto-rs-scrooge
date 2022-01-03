type MarketChart = {
  prices: Data[];
  marketCaps: Data[];
  totalVolumes: Data[];
};

type Data = [timeStampInMs: number, value: number];
