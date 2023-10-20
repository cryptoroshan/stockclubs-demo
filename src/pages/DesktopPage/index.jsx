import { useState, useEffect } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/use-auth";
import { accountApi } from "../../api/account";

import HoldingsPage from "./HoldingsPage";
import TransactionsPage from "./TransactionsPage";
import UserCard from "../../components/UserCard";
import TradingStats from "../../components/TradingStats";
import PortfolioOverview from "../../components/PortfolioOverview";

import linkIcon from "/images/Link.png";

const DesktopPage = () => {
  const { account } = useAuth();

  const [currentTab, setCurrentTab] = useState("Overview");
  const [tradingStats, setTradingStats] = useState(null);
  const [portfolioOverview, setPortfolioOverview] = useState(null);

  useEffect(() => {
    getPortfolioOverview();
    getTradingStats();
  }, []);

  const getPortfolioOverview = async () => {
    try {
      const resp = await accountApi.getPortfolioOverview();
      if (resp.data !== undefined) {
        setPortfolioOverview(resp.data);
      } else {
        toast.error(err.response.data.public_error);
      }
    } catch (err) {
      toast.error(err.response.data.public_error);
    }
  };

  const getTradingStats = async () => {
    try {
      const resp = await accountApi.getTradingStats("my_unique_request_id");
      if (resp.data !== undefined) {
        setTradingStats(resp.data);
      } else {
        toast.error(err.response.data.public_error);
      }
    } catch (err) {
      toast.error(err.response.data.public_error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-[30px] px-2 md:px-[30px] h-[calc(100vh-53px)]">
      <div
        className={clsx(
          "flex flex-col justify-between",
          currentTab === "Overview" ? "w-full md:w-[70vw]" : "w-full"
        )}
      >
        <div className="flex items-center py-[6px]">
          <p className="p-[10px] text-xs text-primary">My Account</p>
          <p className="px-1 py-[10px]">&gt;</p>
          <p className="p-[10px] text-xs text-main">
            {currentTab === "Overview"
              ? "Overview"
              : currentTab === "Holdings"
              ? "Holdings"
              : currentTab === "Transactions"
              ? "Transactions"
              : "Opinions"}
          </p>
        </div>
        <div className="flex flex-col h-full pb-6">
          <ul className="flex text-sm md:text-[17px] font-semibold text-center">
            <li className="cursor-pointer px-2 md:px-4">
              <a
                className={clsx(
                  "inline-block w-full px-1 md:px-2 py-4",
                  currentTab === "Overview"
                    ? "text-main border-[#00ABE1] border-b-[3px]"
                    : "text-[#B0B9D7]"
                )}
                onClick={() => setCurrentTab("Overview")}
              >
                Overview
              </a>
            </li>
            <li className="cursor-pointer px-2 md:px-4">
              <a
                className={clsx(
                  "inline-block w-full px-1 md:px-2 py-4",
                  currentTab === "Holdings"
                    ? "text-main border-[#00ABE1] border-b-[3px]"
                    : "text-[#B0B9D7]"
                )}
                onClick={() => setCurrentTab("Holdings")}
              >
                Holdings
              </a>
            </li>
            <li className="cursor-pointer px-2 md:px-4">
              <a
                className={clsx(
                  "inline-block w-full px-1 md:px-2 py-4",
                  currentTab === "Transactions"
                    ? "text-main border-[#00ABE1] border-b-[3px]"
                    : "text-[#B0B9D7]"
                )}
                onClick={() => setCurrentTab("Transactions")}
              >
                Transactions
              </a>
            </li>
            <li className="cursor-pointer px-2 md:px-4">
              <a
                className={clsx(
                  "inline-block w-full px-1 md:px-2 py-4",
                  currentTab === "Opinions"
                    ? "text-main border-[#00ABE1] border-b-[3px]"
                    : "text-[#B0B9D7]"
                )}
                onClick={() => setCurrentTab("Opinions")}
              >
                Opinions
              </a>
            </li>
          </ul>
          {currentTab === "Overview" && (
            <PortfolioOverview
              className=""
              portfolioOverview={portfolioOverview}
            />
          )}
          {currentTab === "Holdings" && <HoldingsPage />}
          {currentTab === "Transactions" && <TransactionsPage />}
        </div>
      </div>
      <div
        className={clsx(
          "flex-col gap-[30px]",
          currentTab === "Overview" ? "flex" : "hidden"
        )}
      >
        {account !== null && <UserCard account={account} />}
        {tradingStats !== null && <TradingStats tradingStats={tradingStats} />}
        <div className="flex items-center rounded-[10px] p-6 border border-primary w-full md:w-[30vw] h-fit text-[17px] font-medium justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-main">Want your full financial picture?</p>
            <p className="text-secondary">Link more of your accounts</p>
          </div>
          <img className="w-6 h-6" src={linkIcon} />
        </div>
      </div>
    </div>
  );
};

export default DesktopPage;
