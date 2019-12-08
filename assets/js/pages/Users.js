import React, { Component } from "react";
import UsersTable from "../components/UsersTable";
import SideNav from "../components/SideNav";
export default class Users extends Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <SideNav />
        <main style={{ width: "100%" }}>
          <UsersTable />
        </main>
      </div>
    );
  }
}
