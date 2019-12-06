import { Form, Icon, Input, Button, Checkbox } from "antd";
import { Link, withRouter } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../api/ApiCalls";
import {
  loginUserSuccess,
  loginUserFailure,
  toggleLoginUserIsLoading
} from "../../redux/actions/login";

function NormalLoginForm(props) {
  const dispatch = useDispatch();
  const loginStateData = useSelector(state => state.login);

  const handleDoLogin = payload => {
    dispatch(toggleLoginUserIsLoading(true));
    doLogin(payload)
      .then(res => {
        dispatch(loginUserSuccess(res));
        localStorage.setItem("token", res.token);
        localStorage.setItem("login_data", JSON.stringify(res));
      })
      .catch(err => {
        dispatch(loginUserFailure(err));
      })
      .finally(() => {
        dispatch(toggleLoginUserIsLoading(false));
      });
  };

  if (loginStateData.isLogged) {
    setTimeout(() => {
      props.history.push("/");
    }, 200);
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        handleDoLogin(values);
      }
    });
  };

  const { getFieldDecorator, getFieldError } = props.form;
  let emailError =
    getFieldError("email") ||
    (loginStateData.errorMessage && loginStateData.errorMessage.email);
  let passwordError =
    getFieldError("password") ||
    (loginStateData.errorMessage && loginStateData.errorMessage.password);

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <header>
        <h1>KU Alumni Network</h1>
      </header>
      <div className="gap"></div>
      <div className="gap"></div>
      <Form.Item
        validateStatus={emailError ? "error" : "success"}
        help={emailError}
      >
        {getFieldDecorator("email", {
          rules: [
            { type: "email", message: "Please enter a valid email!" },
            { required: true, message: "Please enter your email!" }
          ]
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email Address"
          />
        )}
      </Form.Item>
      <Form.Item
        validateStatus={passwordError ? "error" : "success"}
        help={passwordError}
      >
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please enter your Password!" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <div className="next-page-route">
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(
            <span>
              <Checkbox>Remember me</Checkbox>
            </span>
          )}
          <span>
            <a className="login-form-forgot" href="#lol">
              Forgot password
            </a>
          </span>
          <div className="gap"></div>
          <Button
            type="primary"
            loading={loginStateData.isLoading}
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>

          <span>
            Or <Link to="/register">Create New Account?</Link>
          </span>
        </div>
      </Form.Item>
    </Form>
  );
}

export const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  withRouter(NormalLoginForm)
);
