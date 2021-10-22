import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers/reducer";
import { createBrowserHistory as createHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createHistory({ forceRefresh: true });
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(myRouterMiddleware, ReduxThunk);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(myRouterMiddleware, ReduxThunk, createLogger());
  }
};

const composeEnhancers = composeWithDevTools({ serialize: true });

export const store = createStore(
  rootReducer(history),
  composeEnhancers(getMiddleware())
);
