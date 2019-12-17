import React, { Component } from "react";
import SideNav from "../components/SideNav";
import RequestsList from "../components/RequestsList";
export default class Requests extends Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <SideNav />
        <main style={{ width: "100%" }}>
          <RequestsList />
        </main>
      </div>
    );
  }
}
