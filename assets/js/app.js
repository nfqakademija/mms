import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./core/store";
import Home from "./pages/Home";
import Users from "./pages/Users";

import "..//css/app.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Requests from "./pages/Requests";
import Request from "./pages/Request";

import Login from "./pages/Login";
function App() {
  return (
    <div>
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route path="/requests">
              <Requests />
            </Route>

            <Route path="/request">
              <Request />
            </Route>
            <Route path="/users" component={Users} />
            <Route path="/login" component={Login} />

            <Route component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
