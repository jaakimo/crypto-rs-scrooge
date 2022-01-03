import React, { useState } from 'react';
import DatesForm, { DatesFormValues } from '../components/DatesForm';
import functions from '../functions';
import { filterMarketChartByDates } from '../utils';

interface Props {
  data: MarketChart;
  coinId: string;
}

const MarketInfo = ({ data, coinId }: Props) => {
  const [fromToDates, setFromToDates] = useState<DatesFormValues | undefined>(
    undefined
  );

  const [dataFilteredByDates, setDataFilteredByDates] = useState<MarketChart>({
    marketCaps: [],
    prices: [],
    totalVolumes: [],
  });

  if (data.prices.length === 0) return <div> loading..</div>;

  const { longestBearing } =
    functions.calculateLongestDownwardTrend(dataFilteredByDates);
  const highestVolumeData =
    functions.calculateHighestTradingVolume(dataFilteredByDates);
  const { stonks, buyDate, sellDate, buyPrice, sellPrice } =
    functions.calculateBestBuySellDates(dataFilteredByDates);

  const setDates = (dates: DatesFormValues) => {
    setFromToDates(dates);
    setDataFilteredByDates(filterMarketChartByDates(data, dates));
  };

  return (
    <div className="market-info">
      {fromToDates ? (
        <div className="div-info">
          <h2 className="heading-coin">{coinId}</h2>
          <span>{`${fromToDates.fromDate} - ${fromToDates.toDate}`}</span>
          <h3>Longest bearing</h3>
          <p>{longestBearing}</p>
          <h3>Highest trading volume</h3>
          {highestVolumeData ? (
            <p>
              {`${highestVolumeData[1].toFixed()}€`} <br />
              {new Date(highestVolumeData[0] * 1000).toDateString()}
            </p>
          ) : null}

          <h3>Best buy and sell dates</h3>
          {stonks ? (
            <p>
              {`Travel back in time to ${buyDate?.toDateString()}, and buy coins at ${buyPrice?.toFixed()}€ a piece.
                Sell them later at ${sellDate?.toDateString()} for ${sellPrice?.toFixed()}€ to maximize profits!`}{' '}
            </p>
          ) : (
            <p>No good dates to travel back in time to.</p>
          )}
        </div>
      ) : null}
      <DatesForm submitDates={setDates} />
    </div>
  );
};

export default MarketInfo;
