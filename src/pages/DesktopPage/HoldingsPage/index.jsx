import { useState, useEffect } from "react";
import clsx from "clsx";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

import { accountApi } from "@/api/account";
import HoldingView from "@/components/HoldingView";

import smallArrowIcon from "/images/Small Arrow.png";

const Icon = ({ id, open }) => {
  return (
    <img
      className={`${
        id === open ? "rotate-180" : ""
      } h-6 w-6 transition-transform`}
      src={smallArrowIcon}
    />
  );
};

const HoldingsPage = () => {
  const [currentView, setCurrentView] = useState("Combined View");
  const [holdingData, setHoldingData] = useState(null);
  // const [open, setOpen] = useState(0);
  const [open, setOpen] = useState([]);

  // const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const handleOpen = (value) => {
    const nextOpen = open.map((item) => {
      if (item.id === value) {
        return {
          ...item,
          state: !item.state,
        };
      }
      else
        return item;
    });
    setOpen(nextOpen);
  };

  useEffect(() => {
    getHoldings();
  }, []);

  const getHoldings = async () => {
    try {
      const resp = await accountApi.getHoldings();
      if (resp.data !== undefined) {
        setHoldingData(resp.data);
        let stateList = [];
        for (let i = 0; i < resp.data.accounts.length; i++) {
          let state = {
            id: i,
            state: false,
          };
          stateList.push(state);
        }
        setOpen(stateList);
      } else {
        toast.error(err.response.data.public_error);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      {holdingData !== null && (
        <div className="flex flex-col gap-5 border border-primary rounded-[10px] p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center gap-2 justify-between">
            <p className="text-[17px] text-main font-medium">
              {currentView === "Combined View"
                ? `All accounts have ${holdingData.holdings.length} Holdings`
                : `You have a total of ${holdingData.accounts.length} accounts`}
            </p>
            <div className="flex gap-2 md:gap-5">
              <div
                className={clsx(
                  "border border-secondary rounded-full px-5 py-[3px] text-[15px] font-semibold text-center cursor-pointer",
                  currentView === "Combined View"
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                )}
                onClick={() => setCurrentView("Combined View")}
              >
                Combined View
              </div>
              <div
                className={clsx(
                  "border border-secondary rounded-full px-5 py-[3px] text-[15px] font-semibold text-center cursor-pointer",
                  currentView === "Per Account View"
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                )}
                onClick={() => setCurrentView("Per Account View")}
              >
                Per Account View
              </div>
            </div>
          </div>
          {currentView === "Combined View" && (
            <HoldingView holdingData={holdingData} />
          )}
          {currentView === "Per Account View" && (
            <>
              {holdingData.accounts.map((item, index) => {
                return (
                  <Accordion
                    className="px-2 md:px-4 rounded-[10px] border border-primary"
                    key={index}
                    open={open[index].state === true}
                  >
                    <AccordionHeader
                      className={`justify-start gap-2 md:gap-4 py-[10px] border-b-0 transition-colors ${
                        open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
                      }`}
                      onClick={() => handleOpen(index)}
                    >
                      <Icon id={index + 1} open={open} />
                      <div className="flex items-center gap-1 md:gap-3 text-[17px] text-main w-full">
                        <div>
                          <img
                            className="w-[30px] h-[30px] rounded-full"
                            src={item.broker.profile_picture}
                          />
                        </div>
                        <p className="font-semibold px-2 w-[40%] md:w-[10%] truncate">
                          {item.broker.name}
                        </p>
                        <p className="hidden md:block px-2 w-[25%] truncate">
                          {item.account.account_type}
                        </p>
                        <p className="hidden md:block text-sm font-medium text-secondary px-2 truncate w-[10%]">
                          10 Holdings
                        </p>
                        <p className="hidden md:block text-sm font-medium text-secondary px-2 w-[10%]">
                          {item.account.account_enabled === true
                            ? "Shared Account"
                            : "Private Account"}
                        </p>
                        <p className="text-sm font-medium text-secondary w-[40%] truncate px-2">
                          {"Synced " +
                            new Date(
                              item.account.account_sync_date * 1000
                            ).getFullYear() +
                            "-" +
                            new Date(
                              item.account.account_sync_date * 1000
                            ).getMonth() +
                            "-" +
                            new Date(
                              item.account.account_sync_date * 1000
                            ).getDate()}
                        </p>
                      </div>
                    </AccordionHeader>
                    <AccordionBody>
                      <HoldingView holdingData={holdingData} />
                    </AccordionBody>
                  </Accordion>
                );
              })}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default HoldingsPage;
