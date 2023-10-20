import { useState } from "react";
import clsx from "clsx";

const StockTradesItem = ({ item }) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <tr>
      <td className="py-[10px]">
        <div
          className={clsx(
            "w-[30px] h-[30px] rounded-full mx-auto flex items-center justify-center",
            showImage ? "" : "bg-profile-background"
          )}
        >
          <img
            className={clsx(
              "w-full h-full rounded-full mx-auto",
              showImage ? "block" : "hidden"
            )}
            src={item.auto_post_data.ticker.logo_picture}
            onLoad={() => {
              setShowImage(true);
            }}
          />
          <p
            className={clsx(
              showImage ? "hidden" : "block text-primary text-base"
            )}
          >
            {item.auto_post_data.ticker.ticker.charAt(0)}
          </p>
        </div>
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
          {item.auto_post_data.trading_strategy_type === "BUY_STRATEGY"
            ? "Buy"
            : "Sell"}
        </p>
      </td>
      <td className="py-[10px]">
        <p className="hidden md:block">{item.auto_post_data.price}</p>
      </td>
      <td className="py-[10px]">
        <p className="hidden md:block">{item.auto_post_data.portfolio}</p>
      </td>
      <td className="py-[10px]">
        <p className="text-primary cursor-pointer">View</p>
      </td>
    </tr>
  );
};

export default StockTradesItem;
