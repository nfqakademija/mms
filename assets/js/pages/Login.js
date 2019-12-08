import React, { Component } from "react";
import LoginForm from "../components/LoginForm";

export default class Login extends Component {
  render() {
    return (
      <div>
        <LoginForm />
        <h6>Tip of the day: Just press login</h6>
      </div>
    );
  }
}
