import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./contexts";
import { store } from "./app/store";
import { Provider } from "react-redux";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <DataProvider>
          <App />
        </DataProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
