import clsx from "clsx";
import IllustrationIcon from "/images/Illustration.png";

const PortfolioOverview = ({ portfolioOverview }) => {
  return (
    <>
      {/* {portfolioOverview === null && (
        <div className="flex flex-col border border-primary rounded-[10px] p-6">
          <p className="text-[17px] text-main font-medium">
            Please link your brokerage account to start exchanging investment
            ideas with your friends.
          </p>
          <div className="flex flex-col gap-[10px] text-[15px] w-1/2 mx-auto my-12">
            <div className="flex flex-col gap-5 py-[5px] items-center">
              <p className=" text-[#000]">Link Brokerage Account</p>
              <button
                type="button"
                className="bg-primary rounded-full px-5 py-[3px] text-white font-semibold"
              >
                Add
              </button>
            </div>
            <p className="p-[10px] text-[#666B85] text-center">
              Account and trade value are always private. Dollar values are
              never shared. Only your selected friends will see your relative
              holdings and recent transactions (what you traded, not how much).
            </p>
            <p className="text-primary text-center">How it works</p>
            <img className="w-1/2 mx-auto" src={IllustrationIcon} />
          </div>
        </div>
      )} */}
      {portfolioOverview !== null && (
        <div className="flex flex-col gap-3 border border-primary rounded-[10px] p-4 md:p-6">
          <p className="text-[17px] text-main font-medium">
            Portfolio Structure
          </p>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <p className="text-[17px] font-medium text-secondary">
                {portfolioOverview.accounts.length + " Accounts"}
              </p>
              {/**
               * Accounts
               */}
              <div className="flex flex-col">
                {portfolioOverview.accounts.map((item, index) => {
                  return (
                    <div key={index} className="flex gap-2 md:gap-10 items-center">
                      <div className="min-w-[25%] h-10 py-2">
                        <div
                          className={clsx(
                            "h-full rounded-r-full",
                            index === 0
                              ? "bg-[#F2574A]"
                              : index === 1
                              ? "bg-[#FBBC12]"
                              : index === 2
                              ? "bg-[#31CE5D]"
                              : index === 3
                              ? "bg-[#3994E9]"
                              : "bg-[#C53C84]"
                          )}
                          style={{
                            width: `${item.portfolio_percent}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between px-5 py-[5px] w-full text-[15px]">
                        <div className="flex gap-[15px]">
                          <img
                            className="w-5 h-5 rounded-full"
                            src={item.broker.profile_picture}
                          />
                          <p className="text-main w-[70%] truncate">{item.broker.name}</p>
                        </div>
                        <p className="hidden md:block text-third">
                          {item.account.account_type}
                        </p>
                        <p className="text-main">{item.portfolio_percent}%</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/**
             * Brokers
             */}
            <div className="flex flex-col gap-5">
              <p className="text-[17px] font-medium text-secondary">
                {portfolioOverview.brokers.length + " Brokers"}
              </p>
              <div className="flex flex-col">
                {portfolioOverview.brokers.map((item, index) => {
                  return (
                    <div key={index} className="flex gap-2 md:gap-10 items-center">
                      <div className="min-w-[25%] h-10 py-2">
                        <div
                          className={clsx(
                            "h-full rounded-r-full",
                            index === 0
                              ? "bg-[#F2574A]"
                              : index === 1
                              ? "bg-[#FBBC12]"
                              : index === 2
                              ? "bg-[#31CE5D]"
                              : index === 3
                              ? "bg-[#3994E9]"
                              : "bg-[#C53C84]"
                          )}
                          style={{
                            width: `${item.portfolio_percent}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between px-5 py-[5px] w-full text-[15px]">
                        <div className="flex gap-[15px]">
                          <img
                            className="w-5 h-5 rounded-full"
                            src={item.broker.profile_picture}
                          />
                          <p className="text-main w-[70%] truncate">{item.broker.name}</p>
                        </div>
                        <p className="text-main">{item.portfolio_percent}%</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/**
             * Account Types
             */}
            <div className="flex flex-col gap-5">
              <p className="text-[17px] font-medium text-secondary">
                {portfolioOverview.account_types.length + " Account Types"}
              </p>
              <div className="flex flex-col">
                {portfolioOverview.account_types.map((item, index) => {
                  return (
                    <div key={index} className="flex gap-2 md:gap-10 items-center">
                      <div className="min-w-[25%] h-10 py-2">
                        <div
                          className={clsx(
                            "h-full rounded-r-full",
                            index === 0
                              ? "bg-[#F2574A]"
                              : index === 1
                              ? "bg-[#FBBC12]"
                              : index === 2
                              ? "bg-[#31CE5D]"
                              : index === 3
                              ? "bg-[#3994E9]"
                              : "bg-[#C53C84]"
                          )}
                          style={{
                            width: `${item.portfolio_percent}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between px-5 py-[5px] w-full text-[15px]">
                        <div className="flex gap-[15px]">
                          <div
                            className={clsx(
                              "w-5 h-5 rounded-full",
                              index === 0
                                ? "bg-[#F2574A]"
                                : index === 1
                                ? "bg-[#FBBC12]"
                                : index === 2
                                ? "bg-[#31CE5D]"
                                : index === 3
                                ? "bg-[#3994E9]"
                                : "bg-[#C53C84]"
                            )}
                          ></div>
                          <p className="text-main w-[60%] truncate">{item.account_type}</p>
                        </div>
                        <p className="text-main">{item.portfolio_percent}%</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioOverview;
