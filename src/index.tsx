import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import App from "./App";

import { store } from "./store/store";
import { customHistory } from "./utils/history";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>
);

reportWebVitals();
