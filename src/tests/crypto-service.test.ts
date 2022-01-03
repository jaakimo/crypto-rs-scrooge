import axios from 'axios';
import { DatesFormValues } from '../components/DatesForm';
import { uri } from '../constants';
import cryptoService from '../services/crypto';

describe('Check connection to API', () => {
  test('API/ping should return response status 200', async () => {
    const response = await axios.get(`${uri}/ping`);
    expect(response.status).toBe(200);
  });
});

describe('SERVICE crypto.tsx', () => {
  test('getMarketByDateRange() - should return MarketChart data', async () => {
    const dateValues: DatesFormValues = {
      fromDate: '2020-01-01',
      toDate: '2020-04-01',
    };
    const data = await cryptoService.getMarketByDateRange(
      'bitcoin',
      'eur',
      dateValues
    );

    expect(data.marketCaps.length).toBeGreaterThan(0);
    expect(data.prices.length).toBeGreaterThan(0);
    expect(data.totalVolumes.length).toBeGreaterThan(0);
  });
});
