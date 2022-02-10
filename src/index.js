import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import axios from "axios";

axios.interceptors.request.use(
  (request) => {
    //console.log("interceptor request", request);
    return request;
  },
  (error) => {
    //console.log("interceptor request error", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    //console.log("interceptor response", response);
    return response;
  },
  (error) => {
    //console.log("interceptor request response", error);
    // return Promise.reject(error);
    console.log("error.config", error.config);
    return new Promise((resolve, reject) => {
      const originalReq = error.config;
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config.__isRetryRequest
      ) {
        originalReq._retry = true;

        let res = fetch(
          process.env.REACT_APP_API_BASE_URL + "/api/user/refresh-token",
          {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              Device: "device",
              Token: localStorage.getItem("accessToken"),
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify({
              accessToken: localStorage.getItem("accessToken"),
              refreshToken: localStorage.getItem("refreshToken"),
            }),
          }
        )
          .then((res) => res.json())
          .then((res) => {
            console.log("response refresh", res);
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            originalReq.headers["Authorization"] = "Bearer " + res.accessToken;
            originalReq.headers["Device"] = "device";
            originalReq.__isRetryRequest = true;
            return axios(originalReq);
          });

        return resolve(res);
      }

      return reject(error);
    });
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
