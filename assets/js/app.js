import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import "..//css/app.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div>
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route component={Users} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
