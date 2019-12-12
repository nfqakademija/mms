import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { userActions } from "./actions/user.actions";
import { membershipActions } from "./actions/membership.actions";

import { store } from "./core/store";
import Home from "./pages/Home";
import Memberships from "./pages/Memberships";
import "..//css/app.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Requests from "./pages/Requests";
import Request from "./pages/Request";

import Login from "./pages/Login";

function App() {
  const admin = useSelector(state => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAll());
    dispatch(membershipActions.getAll());
  }, []);
  if (admin.loggedIn) {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/requests">
              <Requests />
            </Route>
            <Route path="/users" component={Memberships} />
            <Route component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div>
        <div className="container">
          <BrowserRouter>
            <Switch>
              <Route path="/admin">
                <Login />
              </Route>
              <Route>
                <Request />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
