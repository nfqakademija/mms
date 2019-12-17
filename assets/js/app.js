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
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.getRequests());
    dispatch(membershipActions.getAll());
  }, [loggedIn]);

  if (loggedIn) {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/requests">
              <Requests />
            </Route>
            <Route component={Memberships} />
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
