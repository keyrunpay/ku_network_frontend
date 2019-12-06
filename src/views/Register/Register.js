import React from "react";
import "./_register.scss";
import { WrappedRegisterForm } from "./RegisterForm";

export default function Register(props) {
  return (
    <div id="alumni-login">
      <div className="centerize">
        <WrappedRegisterForm {...props} />
      </div>
    </div>
  );
}
