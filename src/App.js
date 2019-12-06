import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./views/Dasboard/Dashboard";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import { useDispatch } from "react-redux";
import {
  loginUserSuccess,
  toggleLoginUserIsLoading
} from "./redux/actions/login";
import Axios from "axios";
import { notification } from "antd";

function App() {
  const dispatch = useDispatch();

  //add token to all request
  Axios.interceptors.request.use(function(config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = "Bearer " + token;
    return config;
  });

  Axios.interceptors.response.use(
    //handle on success
    function(response) {
      if (response.data && response.data.message) {
        notification.success({
          message: response.data.message,
          duration: 5
        });
      }
      return response.data;
    },

    //handle on error
    function(error) {
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          notification.error({
            message: error.response.data.message,
            duration: 5
          });
        }
      } else {
        notification.error({
          message: "Some unusual error occured, please try again",
          duration: 5
        });
        return Promise.reject({
          error: "Some unusual error occured, please try again"
        });
      }
      return Promise.reject(error.response.data);
    }
  );

  React.useEffect(() => {
    if (
      localStorage.getItem("login_data") &&
      localStorage.getItem("login_data").length > 5
    ) {
      const data = JSON.parse(localStorage.getItem("login_data"));
      dispatch(loginUserSuccess(data));
      dispatch(toggleLoginUserIsLoading(false));
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Dashboard} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
