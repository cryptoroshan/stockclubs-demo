import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sha256 } from "crypto-hash";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/use-auth";
import { accountApi } from "../../api/account";

import passwordHiddenIcon from "/images/password-hidden.png";

const SignInPage = () => {
  const navigate = useNavigate();
  const { signIn, saveProfile } = useAuth();

  const [loadingView, setLoadingView] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleLoginForm = async () => {
    setLoadingView(true);
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    // const email = "a.sukhanov@stockclubs.io";
    // const password = "12345678bB";
    const hashedPassword = await sha256(password);

    try {
      const resp = await accountApi.login(
        "my_unique_request_id",
        email,
        hashedPassword
      );
      if (resp.loginResult.data !== undefined) {
        await signIn(resp.loginResult.data.token);
        await getUserProfile();
        navigate("/desktop");
      } else {
        toast.error(resp.loginResult.public_error);
      }
    } catch (err) {
      toast.error(err.response.data.public_error);
    }
    setLoadingView(false);
  };

  const getUserProfile = async () => {
    try {
      const resp = await accountApi.getUserProfile("my_unique_request_id");
      if (resp.data !== undefined) {
        await saveProfile(resp.data);
      } else {
        toast.error(resp.loginResult.message);
      }
    } catch (err) {
      toast.error(err.response.data.public_error);
    }
  };

  return (
    <div className="flex flex-col gap-[26px] min-h-full justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-[34px] font-bold text-[#222222]">Sign In</h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-[17px] font-semibold">
        <form className="group flex flex-col gap-[26px]" noValidate>
          <div>
            <div className="relative">
              <input
                ref={emailInputRef}
                type="email"
                placeholder="Enter Your Email"
                className="peer block w-full py-1.5 border-[#B0B9D7] border-b-2 text-gray-900 shadow-sm placeholder:text-placeholder focus:ring-0 focus:outline-none sm:text-sm sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
              <span className="absolute mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter a valid email address
              </span>
            </div>
            <div className="relative mt-[62px]">
              <input
                ref={passwordInputRef}
                type="password"
                className="block w-full py-1.5 border-[#B0B9D7] border-b-2 text-gray-900 shadow-sm placeholder:text-placeholder focus:ring-0 focus:outline-none sm:text-sm sm:leading-6"
                autoComplete="current-password"
                required
                placeholder="Password"
              />
              <img
                className="absolute w-6 h-6 my-auto top-[20%] right-[6px]"
                src={passwordHiddenIcon}
              />
            </div>
            <div className="flex items-center justify-end mt-[14px]">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-primary hover:text-indigo-500"
                >
                  Forgot password
                </a>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center w-full justify-center rounded-[10px] bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 group-invalid:pointer-events-none group-invalid:opacity-30"
            disabled={loadingView === false ? false : true}
            onClick={() => handleLoginForm()}
          >
            {loadingView === true && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {loadingView === false ? "Continue" : "Loading..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
