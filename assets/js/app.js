import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/Home";
import "..//css/app.scss";
function App() {
  return (
    <div>
      <Home />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
