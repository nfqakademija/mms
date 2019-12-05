import React, { Component } from "react";
import SideNav from "../components/SideNav";
import RequestsList from "../components/RequestsList";
export default class Requests extends Component {
  render() {
    return (
      <div>
        <SideNav />
        <div className="container2">
          <RequestsList />
        </div>
        <p></p>
      </div>
    );
  }
}
