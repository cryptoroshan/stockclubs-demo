const TradingStats = ({ tradingStats }) => {
  return (
    <div className="flex flex-col gap-3 rounded-[10px] p-6 border border-primary w-full md:w-[30vw] h-fit">
      <p className="text-[17px] font-medium">Trading Stats</p>
      <table className="w-full">
        <thead className="text-[13px] font-medium">
          <tr>
            <th></th>
            <th>1 Week</th>
            <th>1 Month</th>
            <th>1 Year</th>
            <th>All Time</th>
          </tr>
        </thead>
        <tbody className="text-[15px]">
          <tr>
            <td>Trades</td>
            <td className="text-primary text-center">
              {tradingStats.WEEK_TRADING_STATS_INTERVAL.trades_all}
            </td>
            <td className="text-primary text-center">
              {tradingStats.MONTH_TRADING_STATS_INTERVAL.trades_all}
            </td>
            <td className="text-primary text-center">
              {tradingStats.YEAR_TRADING_STATS_INTERVAL.trades_all}
            </td>
            <td className="text-primary text-center">
              {tradingStats.ALL_TRADING_STATS_INTERVAL.trades_all}
            </td>
          </tr>
          <tr>
            <td>Trades Sell</td>
            <td className="text-primary text-center">
              {tradingStats.WEEK_TRADING_STATS_INTERVAL.trades_sell}
            </td>
            <td className="text-primary text-center">
              {tradingStats.MONTH_TRADING_STATS_INTERVAL.trades_sell}
            </td>
            <td className="text-primary text-center">
              {tradingStats.YEAR_TRADING_STATS_INTERVAL.trades_sell}
            </td>
            <td className="text-primary text-center">
              {tradingStats.ALL_TRADING_STATS_INTERVAL.trades_sell}
            </td>
          </tr>
          <tr>
            <td>Trades Buy</td>
            <td className="text-primary text-center">
              {tradingStats.WEEK_TRADING_STATS_INTERVAL.trades_buy}
            </td>
            <td className="text-primary text-center">
              {tradingStats.MONTH_TRADING_STATS_INTERVAL.trades_buy}
            </td>
            <td className="text-primary text-center">
              {tradingStats.YEAR_TRADING_STATS_INTERVAL.trades_buy}
            </td>
            <td className="text-primary text-center">
              {tradingStats.ALL_TRADING_STATS_INTERVAL.trades_buy}
            </td>
          </tr>
          <tr>
            <td>Tr. Explained</td>
            <td className="text-primary text-center">
              {tradingStats.WEEK_TRADING_STATS_INTERVAL.trades_explained}
            </td>
            <td className="text-primary text-center">
              {tradingStats.MONTH_TRADING_STATS_INTERVAL.trades_explained}
            </td>
            <td className="text-primary text-center">
              {tradingStats.YEAR_TRADING_STATS_INTERVAL.trades_explained}
            </td>
            <td className="text-primary text-center">
              {tradingStats.ALL_TRADING_STATS_INTERVAL.trades_explained}
            </td>
          </tr>
          <tr>
            <td>Most Traded</td>
            <td className="text-primary text-center">
              {tradingStats.WEEK_TRADING_STATS_INTERVAL.traded_most}
            </td>
            <td className="text-primary text-center">
              {tradingStats.MONTH_TRADING_STATS_INTERVAL.traded_most}
            </td>
            <td className="text-primary text-center">
              {tradingStats.YEAR_TRADING_STATS_INTERVAL.traded_most}
            </td>
            <td className="text-primary text-center">
              {tradingStats.ALL_TRADING_STATS_INTERVAL.traded_most}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TradingStats;
