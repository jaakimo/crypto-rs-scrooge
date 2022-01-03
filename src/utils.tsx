import { DatesFormValues } from './components/DatesForm';

export const filterMarketChartByDates = (
  data: MarketChart,
  dates: DatesFormValues
): MarketChart => {
  if (!dates) return data;
  const fromTimeStamp = new Date(dates.fromDate).getTime() / 1000;
  const toTimeStamp = new Date(dates.toDate).getTime() / 1000;
  return {
    marketCaps: data.marketCaps.filter(
      ([timeStamp]) => timeStamp >= fromTimeStamp && timeStamp <= toTimeStamp
    ),
    prices: data.prices.filter(
      ([timeStamp]) => timeStamp >= fromTimeStamp && timeStamp <= toTimeStamp
    ),
    totalVolumes: data.totalVolumes.filter(
      ([timeStamp]) => timeStamp >= fromTimeStamp && timeStamp <= toTimeStamp
    ),
  };
};
