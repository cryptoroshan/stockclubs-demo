import clsx from "clsx";

import StockTrades from "./StockTrades";
import TradingStrategies from "./TradingStrategies";
import { getMonthName } from "../../utils";

const Transactions = ({ transactionData }) => {
  return (
    <div className="flex flex-col gap-5 border border-primary rounded-[10px] p-4 md:p-6">
      <p className="text-[17px] text-main font-medium">
        {getMonthName(new Date(transactionData.post_date * 1000).getMonth()) +
          " " +
          new Date(transactionData.post_date * 1000).getDate() +
          " " +
          new Date(transactionData.post_date * 1000).getFullYear()}
      </p>
      <p
        className={clsx(
          "text-[15px] text-main",
          transactionData.data.stock_trades.length > 0 ? "block" : "hidden"
        )}
      >
        {`Executed ${transactionData.data.stock_trades.length} stock trades:`}
      </p>
      {transactionData.data.stock_trades.length > 0 && (
        <StockTrades stockTradesData={transactionData.data.stock_trades} />
      )}
      <p
        className={clsx(
          "text-[15px] text-main",
          transactionData.data.trading_strategies.length > 0 ? "block" : "hidden"
        )}
      >
        {`Executed ${transactionData.data.trading_strategies.length} trading strategies:`}
      </p>
      {transactionData.data.trading_strategies.length > 0 && (
        <TradingStrategies
          tradingStrategiesData={transactionData.data.trading_strategies}
        />
      )}
    </div>
  );
};

export default Transactions;
