import { Outlet } from "react-router-dom";

import Header from "./header";

const SignInLayout = () => {
  return (
    <div className="w-full min-h-[60vh] flex flex-col justify-between px-[30px] py-[25px]">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default SignInLayout;
