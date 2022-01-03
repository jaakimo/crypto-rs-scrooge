import axios, { AxiosRequestConfig } from 'axios';
import { DatesFormValues } from '../components/DatesForm';
import { uri } from '../constants';

type DataFromApi = {
  data: {
    prices: [timeStamp: number, price: number][];
    market_caps: [timeStamp: number, marketCap: number][];
    total_volumes: [timeStamp: number, totalVolume: number][];
  };
};

const getMarketByDateRange = async (
  coinId: string,
  currency: string,
  dates: DatesFormValues
): Promise<MarketChart> => {
  const unixStart = new Date(dates.fromDate).getTime() / 1000;
  const unixEnd = new Date(dates.toDate).getTime() / 1000;

  const config: AxiosRequestConfig = {
    httpsAgent: 'node',
    params: { from: unixStart, to: unixEnd, vs_currency: currency },
  };

  const { data }: DataFromApi = await axios.get(
    `${uri}/coins/${coinId}/market_chart/range`,
    config
  );

  return (
    {
      prices: data.prices,
      totalVolumes: data.total_volumes,
      marketCaps: data.market_caps,
    } || 'Error: Could not fetch data from API'
  );
};

export default { getMarketByDateRange };
