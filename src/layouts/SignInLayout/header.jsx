import { Link } from "react-router-dom";

import logoIcon from "/images/logo.png";

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <Link to="/">
        <img src={logoIcon} />
      </Link>
      <a
        href="#"
        target="_blank"
        className="text-[#B0B9D7] text-[17px] font-semibold"
      >
        Back
      </a>
    </div>
  );
};

export default Header;
