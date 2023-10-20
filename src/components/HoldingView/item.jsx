import { useState } from "react";
import clsx from "clsx";
import {
  Avatar,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import lockIcon from "/images/Lock.png";

const HoldingViewItem = ({ item }) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <tr>
      <td className="py-[10px]">
        <div className={clsx("w-[30px] h-[30px] rounded-full mx-auto flex items-center justify-center", showImage ? "" : "bg-profile-background")}>
          <img
            className={clsx(
              "w-full h-full rounded-full mx-auto",
              showImage ? "block" : "hidden"
            )}
            src={item.ticker.logo_picture}
            onLoad={() => {
              setShowImage(true);
            }}
          />
          <p className={clsx(showImage ? "hidden" : "block text-primary text-base")}>{item.ticker.ticker.charAt(0)}</p>
        </div>
      </td>
      <td className="py-[10px] w-36 2xl:w-52">
        <p className="w-36 truncate mx-auto">{item.ticker.ticker}</p>
      </td>
      <td className="py-[10px]">
        <p className="hidden md:block text-sm text-third w-72 2xl:w-128 truncate mx-auto">
          {item.ticker.name}
        </p>
      </td>
      <td className="py-[10px]">
        <p className="hidden md:block">{item.portfolio_percent}%</p>
      </td>
      <td className="py-[10px]">
        <div className="hidden md:flex gap-2 justify-center items-center">
          <p>
            {item.cost_basis === undefined
              ? "Empty"
              : `$${item.cost_basis.toFixed(2)}`}
          </p>
          <img
            className={clsx(
              "w-[18px] h-[18px]",
              item.cost_basis === undefined ? "hidden" : "block"
            )}
            src={lockIcon}
          />
        </div>
      </td>
      <td className="py-[10px]">
        <p className="hidden md:block">{item.current_price.toFixed(2)}</p>
      </td>
      <td className="py-[10px]">
        <div className="flex gap-2 justify-center items-center">
          <p>
            {item.unrealized_gains_percent === undefined
              ? "Empty"
              : item.unrealized_gains_percent.toFixed(2) + "%"}
          </p>
          <img
            className={clsx(
              "w-[18px] h-[18px]",
              item.unrealized_gains_percent === undefined ? "hidden" : "block"
            )}
            src={lockIcon}
          />
        </div>
      </td>
    </tr>
  );
};

export default HoldingViewItem;
