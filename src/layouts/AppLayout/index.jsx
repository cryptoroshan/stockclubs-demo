import { Outlet } from "react-router-dom";

import Header from "./header";

const AppLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
