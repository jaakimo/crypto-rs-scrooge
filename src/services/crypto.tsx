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

const timeStampToUnixFormat = ([timeStamp, value]: [number, number]): Data => [
  timeStamp / 1000,
  value,
];

const getCoinIds = async () => {
  const config: AxiosRequestConfig = { httpsAgent: 'node' };
  const response = await axios.get(`${uri}/coins/list`, config);
  return response.data;
};

const getMarketByDateRange = async (
  coinId: string,
  currency: string,
  values: DatesFormValues
): Promise<MarketChart> => {
  const unixStart = new Date(values.fromDate).getTime() / 1000;
  const unixEnd = new Date(values.toDate).getTime() / 1000;

  const config: AxiosRequestConfig = {
    httpsAgent: 'node',
    params: { from: unixStart, to: unixEnd, vs_currency: currency },
  };

  const { data }: DataFromApi = await axios.get(
    `${uri}/coins/${coinId}/market_chart/range`,
    config
  );

  if (!data) {
    throw new Error('Could not connect to API');
  }

  const prices = data.prices.map(timeStampToUnixFormat);
  const marketCaps = data.market_caps.map(timeStampToUnixFormat);
  const totalVolumes = data.total_volumes.map(timeStampToUnixFormat);
  return { prices, totalVolumes, marketCaps };
};

export default { getCoinIds, getMarketByDateRange };
