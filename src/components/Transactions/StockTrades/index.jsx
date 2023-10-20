import StockTradesItem from "./StockTradesItem";

const StockTrades = ({ stockTradesData }) => {
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
            <span className="hidden md:block">Price</span>
          </th>
          <th>
            <span className="hidden md:block">Portfolio</span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody className="text-[17px] text-main font-medium text-center">
        {stockTradesData.map((item, index) => {
          return (
            <StockTradesItem key={index} item={item} />
          );
        })}
      </tbody>
    </table>
  );
};

export default StockTrades;
