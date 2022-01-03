import React, { useEffect, useState } from 'react';

import MarketInfo from './pages/MarketInfo';

import cryptoService from './services/crypto';

import { DatesFormValues } from './components/DatesForm';
import './App.scss';

const App = () => {
  const [marketData, setMarketData] = useState<MarketChart>({
    prices: [],
    totalVolumes: [],
    marketCaps: [],
  });

  const getMarketDataAndUpdate = async (
    dates: DatesFormValues,
    coinId = 'bitcoin',
    currency = 'eur'
  ) => {
    const marketDataFromApi = await cryptoService.getMarketByDateRange(
      coinId,
      currency,
      dates
    );
    setMarketData(marketDataFromApi);
  };

  /** useEffect - run only once at first render
   * 
   *  Opt for less API calls by fetching all available data at once, 
   *  which also gets daily data (see below).
      
  From API documentation:
    Data granularity is automatic (cannot be adjusted)
    1 day from query time = 5 minute interval data
    1 - 90 days from query time = hourly data
    above 90 days from query time = daily data (00:00 UTC)
  */
  useEffect(() => {
    getMarketDataAndUpdate({
      fromDate: '2005-01-01',
      toDate: new Date().toISOString(),
    });
  }, []);

  return (
    <div className="container">
      <h1>Scrooge&lsquo;s CryptoCoin App</h1>
      <MarketInfo data={marketData} coinId={'bitcoin'} />
    </div>
  );
};

export default App;
