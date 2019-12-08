import React from "react";
import SideNav from "../components/SideNav";
import TotalChart from "../components/TotalChart";
export default function home() {
  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <main style={{ width: "100%" }}>
        <TotalChart />
      </main>
    </div>
  );
}
