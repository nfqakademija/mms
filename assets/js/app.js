import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./core/store";
import Home from "./pages/Home";
import Users from "./pages/Users";
import "..//css/app.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Requests from "./pages/Requests";
function App() {
  return (
    <div>
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route path="/requests">
              <Requests />
            </Route>
            <Route path="/users" component={Users} />
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
