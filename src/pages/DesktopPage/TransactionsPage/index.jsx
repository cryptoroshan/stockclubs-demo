import { useState, useEffect } from "react";
import { accountApi } from "@/api/account";
import { toast } from "react-toastify";

import Transactions from "../../../components/Transactions";

const TransactionsPage = () => {
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const resp = await accountApi.getTransactions();
      console.log(resp.data);
      if (resp.data !== undefined) {
        let _transactionData = [];

        let _data = {
          post_date: resp.data[0].post_date,
          data: {
            stock_trades: [],
            trading_strategies: [],
          },
        };
        if (
          resp.data[0].auto_post_data.trading_strategy_type ===
            "BUY_STRATEGY" ||
          resp.data[0].auto_post_data.trading_strategy_type === "SELL_STRATEGY"
        )
          _data.data.stock_trades.push(resp.data[0]);
        else _data.data.trading_strategies.push(resp.data[0]);

        for (let i = 1; i < resp.data.length; i++) {
          if (resp.data[i].post_date === _data.post_date) {
            if (
              resp.data[i].auto_post_data.trading_strategy_type ===
                "BUY_STRATEGY" ||
              resp.data[i].auto_post_data.trading_strategy_type ===
                "SELL_STRATEGY"
            )
              _data.data.stock_trades.push(resp.data[i]);
            else _data.data.trading_strategies.push(resp.data[i]);
          } else {
            _transactionData.push(_data);
            _data = {
              post_date: resp.data[i].post_date,
              data: {
                stock_trades: [],
                trading_strategies: [],
              },
            };
            if (
              resp.data[i].auto_post_data.trading_strategy_type ===
                "BUY_STRATEGY" ||
              resp.data[i].auto_post_data.trading_strategy_type ===
                "SELL_STRATEGY"
            )
              _data.data.stock_trades.push(resp.data[i]);
            else _data.data.trading_strategies.push(resp.data[i]);
          }
        }
        console.log(_transactionData);
        setTransactionData(_transactionData);
      } else {
        toast.error(err.response.data.public_error);
      }
    } catch (err) {
      toast.error(err.response.data.public_error);
    }
  };

  return (
    <div className="flex flex-col gap-[30px] pb-6">
      {transactionData?.map((item, index) => {
        return <Transactions key={index} transactionData={item} />;
      })}
    </div>
  );
};

export default TransactionsPage;
