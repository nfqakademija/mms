import React from "react";
import { Link } from "react-router-dom";

export default function SideNav() {
  return (
    <div className="sidenav">
      <Link to="/">Pagrindinis</Link>
      <Link to="/users">Nariai</Link>
      <Link to="/requests">Užklausos</Link>
    </div>
  );
}
