import React from "react";
import { Redirect } from "react-router-dom";

export default function LoginGuard(props) {
  return localStorage.getItem("token") ? (
    <React.Fragment>{props.children}</React.Fragment>
  ) : (
    <Redirect to="/login" />
  );
}
