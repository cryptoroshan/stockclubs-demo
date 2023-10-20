import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignInLayout from "./layouts/SignInLayout";
import AppLayout from "./layouts/AppLayout";

import SignInPage from "./pages/SignInPage";
import DesktopPage from "./pages/DesktopPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<SignInLayout />}>
          <Route path="/" element={<SignInPage />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/desktop" element={<DesktopPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
    </>
  );
}

export default App;
