import React, { Component } from "react";
import SideNav from "../components/SideNav";
import RequestForm from "../components/RequestForm";
export default class Request extends Component {
  render() {
    return (
      <div>
        {alert("Try out .../admin ")}
        <RequestForm />
        <p></p>
      </div>
    );
  }
}
