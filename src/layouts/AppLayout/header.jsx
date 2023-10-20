import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { useAuth } from "../../hooks/use-auth";

import menuIcon from "/images/menu.png";
import logoIcon from "/images/logo.png";
import closeIcon from "/images/close.png";
import feedIcon from "/images/Feed.png";
import exploreIcon from "/images/Explore.png";
import myNetworkIcon from "/images/My-network.png";
import meIcon from "/images/Me.png";

const Header = () => {
  const { account } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    try {
      if (wrapperRef && !wrapperRef.current.contains(event.target)) {
        setOpenNav(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex justify-between px-2 md:px-[33px] py-[9px]">
        <div className="flex gap-1 md:gap-[23px] items-center">
          <img
            className="cursor-pointer"
            src={menuIcon}
            onClick={() => setOpenNav(!openNav)}
          />
          <Link to="/desktop">
            <img src={logoIcon} />
          </Link>
        </div>
        <div className="flex gap-2 md:gap-4 items-center">
          <img
            className="w-8 h-8 rounded-full"
            src={account?.user.profile_picture}
          />
          <p className="text-[15px] text-secondary">
            {account?.user.first_name + " " + account?.user.last_name}
          </p>
        </div>
      </div>
      <div
        ref={wrapperRef}
        className={clsx(
          "h-[100%] fixed z-50 top-0 left-0 bg-white ease-in-out duration-300 text-base overflow-hidden",
          openNav ? "w-[200px]" : "w-[0px]"
        )}
      >
        <div className="flex flex-col text-[11px] font-semibold">
          <div className="flex pl-[30px] pr-4 justify-between items-center h-[50px]">
            <p className="text-main">Menu</p>
            <img
              className="w-[19px] h-[19px] cursor-pointer"
              onClick={() => setOpenNav(!openNav)}
              src={closeIcon}
            />
          </div>
          <div className="flex px-[30px] gap-4 items-center cursor-pointer h-[50px]">
            <img className="w-6 h-6" src={feedIcon} />
            <p className="text-third">Feed</p>
          </div>
          <div className="flex px-[30px] gap-4 items-center cursor-pointer h-[50px]">
            <img className="w-6 h-6" src={exploreIcon} />
            <p className="text-third">Explore</p>
          </div>
          <div className="flex px-[30px] gap-4 items-center cursor-pointer h-[50px]">
            <img className="w-6 h-6" src={myNetworkIcon} />
            <p className="text-third">My Network</p>
          </div>
          <div className="flex px-[30px] gap-4 items-center cursor-pointer h-[50px]">
            <img className="w-6 h-6" src={meIcon} />
            <p className="text-third">Me</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
