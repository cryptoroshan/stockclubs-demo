import { getMonthName } from "../utils";

const UserCard = ({ account }) => {
  return (
    <div className="relative flex flex-col rounded-[10px] mt-[10px] px-6 py-5 border border-primary w-full md:w-[30vw] h-fit">
      <div className="absolute bg-[#40C2F4] w-full h-[60px] rounded-t-[10px] left-0 top-0"></div>
      <div className="flex flex-col gap-[10px] w-full md:w-1/2 mx-auto z-10">
        <div className="bg-white w-fit rounded-full p-1.5 mx-auto">
          <img
            className="w-20 h-20 rounded-full mx-auto"
            src={account.user.profile_picture}
          />
        </div>
        <p className="text-2xl font-bold text-center text-main">
          {account.user.first_name + " " + account.user.last_name}
        </p>
        <div className="flex justify-between text-center text-primary">
          <div className="flex flex-col gap-[2px] items-center">
            <p className="text-[21px] font-semibold">
              {account.follower.count}
            </p>
            <p className="text-[15px]">Followers</p>
          </div>
          <div className="flex flex-col gap-[2px] items-center">
            <p className="text-[21px] font-semibold">
              {account.following.count}
            </p>
            <p className="text-[15px]">Following</p>
          </div>
          <div className="flex flex-col gap-[2px] items-center">
            <p className="text-[21px] font-semibold">{account.num_groups}</p>
            <p className="text-[15px]">Groups</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-[15px]">
        <div className="flex justify-between py-2 border-b-[1px] border-[#EBEFFF]">
          <p className="text-secondary">Investing since</p>
          <p className="text-main">
            {account.investor_profile.investing_start_date !== null
              ? getMonthName(
                  new Date(
                    account.investor_profile.investing_start_date * 1000
                  ).getMonth()
                ) +
                " " +
                new Date(
                  account.investor_profile.investing_start_date * 1000
                ).getFullYear()
              : "Empty"}
          </p>
        </div>
        <div className="flex justify-between py-2 border-b-[1px] border-[#EBEFFF]">
          <p className="text-secondary">Risk Tolerance</p>
          <p className="text-main">
            {account.investor_profile.risk_tolerance === null
              ? "Empty"
              : account.investor_profile.risk_tolerance === "LOW_RISK_TOLERANCE"
              ? "Low"
              : "High"}
          </p>
        </div>
        <div className="flex justify-between py-2 border-b-[1px] border-[#EBEFFF]">
          <p className="text-secondary">Sharing Trades since</p>
          <p className="text-main">
            {account.investor_profile.sharing_trades_since === null
              ? "Empty"
              : getMonthName(
                  new Date(
                    account.investor_profile.sharing_trades_since * 1000
                  ).getMonth()
                ) +
                " " +
                new Date(
                  account.investor_profile.sharing_trades_since * 1000
                ).getFullYear()}
          </p>
        </div>
        <div className="flex justify-between py-2 border-b-[1px] border-[#EBEFFF]">
          <p className="text-secondary">Joined Stock Clubs</p>
          <p className="text-main">
            {account.investor_profile.user_start_date === null
              ? "Empty"
              : getMonthName(
                  new Date(
                    account.investor_profile.user_start_date * 1000
                  ).getMonth()
                ) +
                " " +
                new Date(
                  account.investor_profile.user_start_date * 1000
                ).getFullYear()}
          </p>
        </div>
        <div className="flex justify-between py-2 border-b-[1px] border-[#EBEFFF]">
          <p className="text-secondary">Financial Tools</p>
          <p className="text-main">
            {account.investor_profile.financial_tools.length === 0
              ? "Empty"
              : account.investor_profile.financial_tools.map((item, index) => {
                  item;
                })}
          </p>
        </div>
        <div className="flex justify-between py-2 border-b-[1px] border-[#EBEFFF]">
          <p className="text-secondary">Financial News</p>
          <p className="text-main">
            {account.investor_profile.financial_news.length === 0
              ? "Empty"
              : account.investor_profile.financial_news.map((item, index) => {
                  item;
                })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
