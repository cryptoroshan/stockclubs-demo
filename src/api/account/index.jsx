import { SERVER_API_URL } from "../config";
import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
const STORAGE_KEY = "accessToken";

// axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     console.log("error >>> ", error);
//     if (
//       error.response.status == 401 &&
//       error.response.data.status == "fail" &&
//       error.response.data.message.name == "TokenExpiredError"
//     ) {
//       window.location.href = "/auth";
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

axios.interceptors.request.use(
  function (config) {
    const accessToken = sessionStorage.getItem(STORAGE_KEY);
    if (accessToken != null) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

class AccountApi {
  me(request) {
    const { accessToken } = request;
    console.log(accessToken);

    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        const decodedToken = jwt_decode(accessToken);
        console.log(" >>> decodeToken >>> ", decodedToken);

        const currrentTime = Date.now() / 1000;

        if (decodedToken.exp < currrentTime) {
          // Token has expired
          reject(new Error("Token expired"));
        } else {
          const {
            account_id,
            username,
            email,
            name,
            avatar_file,
            short_description,
            is_official,
          } = decodedToken;
          resolve({
            account_id: account_id,
            username: username,
            email: email,
            name: name,
            avatar: avatar_file,
            description: short_description,
            is_official: is_official,
          });
        }
      } catch (err) {
        console.error("[Account Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }

  async login(request_id, email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(`${SERVER_API_URL}/v1/auth`, {
          request_id: request_id,
          email: email,
          passwd: password,
        });
        if (response.status === 200) {
          resolve({
            loginResult: response.data,
          });
        } else {
          reject(new Error(response.data.public_error));
        }
      } catch (err) {
        console.error("Account Api Error >>>", err);
        reject(err);
      }
    });
  }

  async getUserProfile(request_id, user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = sessionStorage.getItem(STORAGE_KEY);
        if (accessToken == null) {
          return reject(new Error("Invalid access token"));
        }

        const response = await axios.get(
          `${SERVER_API_URL}/v1/user/profile?request_id=` + request_id
        );
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error(response.data.public_error));
        }
      } catch (err) {
        console.error("Account Api Error >>>", err);
        reject(err);
      }
    });
  }

  async getTradingStats(request_id, user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = sessionStorage.getItem(STORAGE_KEY);
        if (accessToken == null) {
          return reject(new Error("Invalid access token"));
        }

        const response = await axios.get(
          `${SERVER_API_URL}/v1/user/trading_stats?request_id=` + request_id
        );
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error(response.data.public_error));
        }
      } catch (err) {
        console.error("Account Api Error >>>", err);
        reject(err);
      }
    });
  }

  async getPortfolioOverview(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = sessionStorage.getItem(STORAGE_KEY);
        if (accessToken == null) {
          return reject(new Error("Invalid access token"));
        }

        const response = await axios.get(
          `${SERVER_API_URL}/v1/user/portfolio_overview`
        );
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error(response.data.public_error));
        }
      } catch (err) {
        console.error("Account Api Error >>>", err);
        reject(err);
      }
    });
  }

  async getHoldings(user_id = null, account_id = null) {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = sessionStorage.getItem(STORAGE_KEY);
        if (accessToken == null) {
          return reject(new Error("Invalid access token"));
        }

        let response;
        if (user_id === null && account_id === null) {
          response = await axios.get(`${SERVER_API_URL}/v3/user/holdings`);
        } else if (user_id === null && account_id !== null) {
          response = await axios.get(
            `${SERVER_API_URL}/v3/user/holdings?account_id=${account_id}`
          );
        } else if (user_id !== null && account_id === null) {
          response = await axios.get(
            `${SERVER_API_URL}/v3/user/holdings?user_id=${user_id}`
          );
        } else {
          response = await axios.get(
            `${SERVER_API_URL}/v3/user/holdings?user_id=${user_id}&account_id=${account_id}`
          );
        }

        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error(response.data.public_error));
        }
      } catch (err) {
        console.error("Account Api Error >>>", err);
        reject(err);
      }
    });
  }

  async getTransactions(offset=null, count=null) {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = sessionStorage.getItem(STORAGE_KEY);
        if (accessToken == null) {
          return reject(new Error("Invalid access token"));
        }

        let response;
        if (offset === null && count === null) {
          response = await axios.get(`${SERVER_API_URL}/v2/user/transactions`);
        } else if (offset === null && count !== null) {
          response = await axios.get(
            `${SERVER_API_URL}/v2/user/transactions?count=${count}`
          );
        } else if (offset !== null && count === null) {
          response = await axios.get(
            `${SERVER_API_URL}/v2/user/transactions?offset=${offset}`
          );
        } else {
          response = await axios.get(
            `${SERVER_API_URL}/v2/user/transactions?offset=${offset}&count=${count}`
          );
        }

        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error(response.data.public_error));
        }
      } catch (err) {
        console.error("Account Api Error >>>", err);
        reject(err);
      }
    });
  }
}

export const accountApi = new AccountApi();
