import HoldingViewItem from "./item";

const HoldingView = ({ holdingData }) => {
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
            <span className="hidden md:block">Portfolio</span>
          </th>
          <th>
            <span className="hidden md:block">Cost Basis</span>
          </th>
          <th>
            <span className="hidden md:block">Current Price</span>
          </th>
          <th>Unrealized Gains</th>
        </tr>
      </thead>
      <tbody className="text-[17px] text-main font-medium text-center">
        {holdingData.holdings.map((item, index) => {
          return (
            <HoldingViewItem key={index} item={item} />
          );
        })}
      </tbody>
    </table>
  );
};

export default HoldingView;
