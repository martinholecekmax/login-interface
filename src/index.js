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
    return Promise.reject(error);
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
