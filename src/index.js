import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom"; //to enable routing functionality in react application
import { Provider } from "react-redux"; //we will import this and then wrap our application with Provider as shown below
import { store } from "./redux/store"; //import store to mantain login globally, wrap app with it

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>   
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
