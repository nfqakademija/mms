import React, { Component } from "react";
import UsersTable from "../components/UsersTable";
import { Link } from "react-router-dom";
export default class Users extends Component {
  render() {
    return (
      <div>
        <div className="sidenav">
          <Link to="/users">Vartotojai</Link>
        </div>
        <UsersTable />
      </div>
    );
  }
}
