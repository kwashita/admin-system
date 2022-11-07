import React from "react";
import loginLeft from "@/assets/images/login_left.png";
import logo from "@/assets/images/logo.png";
import { Switch } from "antd";
import LoginForm from "./components/LoginForm";
import "./index.less";

export default function Login() {
  return (
    <div className="login-container">
      <Switch
        className="dark"
        checkedChildren={<>🌞</>}
        unCheckedChildren={<>🌜</>}
      />
      <div className="login-box">
        <div className="login-left">
          <img src={loginLeft} alt="login" />
        </div>
        <div className="login-form">
          <div className="login-logo">
            <img src={logo} alt="logo" className="login-icon" />
            <span className="logo-text">Hooks-Admin</span>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
