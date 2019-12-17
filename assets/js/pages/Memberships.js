import React, { Component } from "react";
import MembershipsTable from "../components/MembershipsTable";
import SideNav from "../components/SideNav";
export default class Memberships extends Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <SideNav />
        <main>
          <MembershipsTable />
        </main>
      </div>
    );
  }
}
