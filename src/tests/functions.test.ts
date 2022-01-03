import functions from '../functions';
import cryptoService from '../services/crypto';
import { filterMarketChartByDates } from '../utils';

describe('functions.tsx', () => {
  let data: MarketChart;
  beforeAll(async () => {
    const dateValues = {
      fromDate: '2020-01-01',
      toDate: '2022-01-01',
    };
    data = await cryptoService.getMarketByDateRange(
      'bitcoin',
      'eur',
      dateValues
    );
  });
  // Example: In bitcoin’s historical data from CoinGecko,
  // the price decreased 2 days in a row for the
  // inputs from 2020-01-19 and to 2020-01-21, and the price
  // decreased for 8 days in a row for the
  // inputs from 2020-03-01 and to 2021-08-01.

  test('calculateLongestDownwardTrend() - inputs from 2020-01-19 to 2020-01-21 should return 2', () => {
    const fromDate = '2020-01-19';
    const toDate = '2020-01-21';

    const filteredData = filterMarketChartByDates(data, { fromDate, toDate });
    expect(
      functions.calculateLongestDownwardTrend(filteredData).longestBearing
    ).toBe(2);
  });

  test('calculateLongestDownwardTrend() - inputs from 2020-03-01 to 2021-08-21 should return 8', () => {
    const fromDate = '2020-03-01';
    const toDate = '2021-08-01';
    const filteredData = filterMarketChartByDates(data, { fromDate, toDate });
    expect(
      functions.calculateLongestDownwardTrend(filteredData).longestBearing
    ).toBe(8);
  });
});
