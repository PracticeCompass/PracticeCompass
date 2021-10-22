import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, history } from "redux/store";
import { ConnectedRouter } from "connected-react-router";
import App from "./App";
import Footer from "./containers/footer/Footer";
import Spinner from "./common/spinner/Spinner.js";
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Spinner />
      <App />
      <Footer />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
