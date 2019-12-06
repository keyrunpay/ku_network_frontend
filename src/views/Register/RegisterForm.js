import { Form, Icon, Input, Button, Select } from "antd";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { doRegister } from "../../api/ApiCalls";

function NormalLoginForm(props) {
  const [error, setError] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const register = payload => {
    setLoading(true);
    doRegister(payload)
      .then(res => {
        props.history.push("/login");
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        register(values);
      }
    });
  };

  const { getFieldDecorator, getFieldError } = props.form;
  let emailError = getFieldError("email") || error.email;
  let passwordError = getFieldError("password") || error.password;
  let nameError = getFieldError("name") || error.name;

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <header>
        <h1>KU Alumni Network</h1>
      </header>
      <div className="gap"></div>
      <div className="gap"></div>
      <Form.Item
        validateStatus={nameError ? "error" : "success"}
        help={nameError}
      >
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "Please enter your full name!" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Full Name"
          />
        )}
      </Form.Item>
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
          <Input.Password
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("gender", {
          rules: [{ required: true, message: "Please select your Gender!" }]
        })(
          <Select placeholder="Gender">
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator("user_type", {
          rules: [{ required: true, message: "Please select one user type!" }]
        })(
          <Select placeholder="User Type">
            <Select.Option value="Student">Student</Select.Option>
            <Select.Option value="Alumni">Alumni</Select.Option>
            <Select.Option value="Faculty">Faculty</Select.Option>
          </Select>
        )}
      </Form.Item>
      <div className="gap"></div>
      <Form.Item>
        <Button
          type="primary"
          loading={loading}
          htmlType="submit"
          className="login-form-button"
        >
          Register
        </Button>
        <div className="gap"></div>
        <div className="next-page-route">
          <span>
            Already Signed Up? <Link to="/login">Login</Link>
          </span>
        </div>
        <p className="font-11 font-bold">
          Note: You need to provide more info after registration
        </p>
      </Form.Item>
    </Form>
  );
}

export const WrappedRegisterForm = Form.create({ name: "normal_login" })(
  withRouter(NormalLoginForm)
);
