const calculateLongestDownwardTrend = (
  data: MarketChart
): { longestBearing: number; startIndex: number } => {
  const prices = data.prices.map(([, price]) => price);

  let temp = 0;
  let startIndex = 0;
  let longestBearing = 0;

  for (let i = 0; i < prices.length; i++) {
    if (i > 0) {
      if (prices[i] <= prices[i - 1]) {
        temp++;
        if (temp > longestBearing) {
          longestBearing = temp;
          startIndex = i - longestBearing;
        }
      } else {
        temp = 0;
      }
    }
  }
  return { longestBearing, startIndex };
};

const calculateHighestTradingVolume = (data: MarketChart): Data | undefined => {
  const totalVolumes = data.totalVolumes.map(([, volume]) => volume);

  const highestVolume = Math.max(...totalVolumes);

  const result = data.totalVolumes.find(
    ([, volume]) => volume === highestVolume
  );

  return result;
};

const calculateBestBuySellDates = (
  data?: MarketChart
): {
  stonks: boolean;
  buyDate?: Date;
  sellDate?: Date;
  buyPrice?: number;
  sellPrice?: number;
} => {
  if (!data) return { stonks: false };
  const pricesSorted = data.prices.sort((a, b) => a[1] - b[1]);

  for (let buyIndex = 0; buyIndex < pricesSorted.length; buyIndex++) {
    for (let sellIndex = pricesSorted.length - 1; sellIndex >= 0; sellIndex--) {
      if (pricesSorted[buyIndex][0] < pricesSorted[sellIndex][0]) {
        const buyDate = new Date(pricesSorted[buyIndex][0]);
        const sellDate = new Date(pricesSorted[sellIndex][0]);
        return {
          stonks: true,
          buyDate,
          sellDate,
          buyPrice: pricesSorted[buyIndex][1],
          sellPrice: pricesSorted[sellIndex][1],
        };
      }
    }
  }

  return { stonks: false };
};
export default {
  calculateLongestDownwardTrend,
  calculateHighestTradingVolume,
  calculateBestBuySellDates,
};
