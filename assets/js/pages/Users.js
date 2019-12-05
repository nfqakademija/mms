import React, { Component } from "react";
import UsersTable from "../components/UsersTable";
import SideNav from "../components/SideNav";
export default class Users extends Component {
  render() {
    return (
      <div>
        <SideNav />
        <div className="container2">
          <UsersTable />
        </div>
      </div>
    );
  }
}
