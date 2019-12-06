import React from "react";
import { WrappedNormalLoginForm } from "./LoginForm";
import "./_login.scss";

export default function Login() {
  return (
    <div id="alumni-login">
      <div className="centerize">
        <WrappedNormalLoginForm />
      </div>
    </div>
  );
}
