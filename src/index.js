import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./css/main.css";
import App from "./App";
import SideBar from "./components/UI/SideBar";
import reportWebVitals from "./reportWebVitals";

import firebase, { FireBaseContext } from "./firebase";

ReactDOM.render(
  <FireBaseContext.Provider value={{ firebase }}>
    <BrowserRouter>
      <div className="md:flex min-h-screen">
        <SideBar />
        <div className="md:w3/5 xl:w-4/5 p-6">
          <App />
        </div>
      </div>
    </BrowserRouter>
  </FireBaseContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
