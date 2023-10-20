import { getMonthName } from "../../../utils";

const TradingStrategies = ({ tradingStrategiesData }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-sm text-secondary font-medium">
          <th>Ticker</th>
          <th>Symbol</th>
          <th>
            <span className="hidden md:block">Full Name</span>
          </th>
          <th>
            <span className="hidden md:block">Strategy</span>
          </th>
          <th>
            <span className="hidden md:block">Expiration</span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody className="text-[17px] text-main font-medium text-center">
        {tradingStrategiesData.map((item, index) => {
          return (
            <tr key={index}>
              <td className="py-[10px]">
                <img
                  className="w-[30px] h-[30px] rounded-full mx-auto"
                  src={item.auto_post_data.ticker.logo_picture}
                />
              </td>
              <td className="py-[10px] w-36 2xl:w-52">
                <p className="w-36 truncate mx-auto">
                  {item.auto_post_data.ticker.ticker}
                </p>
              </td>
              <td className="py-[10px]">
                <p className="hidden md:block text-sm text-third w-72 2xl:w-128 truncate mx-auto">
                  {item.auto_post_data.ticker.name === ""
                    ? "Empty"
                    : item.auto_post_data.ticker.name}
                </p>
              </td>
              <td className="py-[10px]">
                <p className="hidden md:block">
                  {item.auto_post_data.trading_strategy_type}
                </p>
              </td>
              <td className="py-[10px]">
                <p className="hidden md:block">
                  {getMonthName(
                    new Date(item.auto_post_data.expiration * 1000).getMonth()
                  ) +
                    "/" +
                    new Date(item.auto_post_data.expiration * 1000).getDate() +
                    "/" +
                    new Date(
                      item.auto_post_data.expiration * 1000
                    ).getFullYear()}
                </p>
              </td>
              <td className="py-[10px]">
                <p className="text-primary cursor-pointer">View</p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TradingStrategies;
