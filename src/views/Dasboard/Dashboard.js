import React from "react";
import "./_dashboard.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import DashboardEvents from "../../components/DashboardEvents/DashboardEvents";
import FeedPostMaker from "../../components/FeedPostMaker/FeedPostMaker";
import DashboardFeeds from "../../components/DashboardFeeds/DashboardFeeds";
import { Route } from "react-router-dom";
import MyProfile from "../MyProfile/MyProfile";
import LoginGuard from "../../components/LoginGuard/LoginGuard";
import { Icon } from "antd";
import { getHomePageData } from "../../api/ApiCalls";
import {
  getProfileInfoSuccess,
  setProfileInfoFetchState
} from "../../redux/actions/profileInfo";
import { useDispatch } from "react-redux";
import { useProfile, isVerified } from "../../hooks/useProfile";
import AdminPannel from "../Admin/AdminPannel";
import UserProfile from "../UserProfile/UserProfile";

export default function Dashboard(props) {
  const [verified, setVerified] = React.useState(false);
  const [animate, setAnimate] = React.useState(false);

  const profile = useProfile();
  const verify = isVerified(profile);
  const dispatch = useDispatch();

  const getHomePage = () => {
    getHomePageData().then(
      res => {
        dispatch(getProfileInfoSuccess(res));
        dispatch(setProfileInfoFetchState(true));
      },
      err => {
        console.error(err);
      }
    );
  };

  React.useEffect(() => {
    setVerified(verify);
  }, [verify]);

  React.useEffect(() => {
    localStorage.getItem("token") && getHomePage();
    // eslint-disable-next-line
  }, [0]);

  return (
    <LoginGuard>
      {!verified && (
        <div className={`verification-alert ${animate && "doAnimate"}`}>
          <p>
            Please verify your profile to be able to use full feature of the
            system
          </p>
          {!animate && (
            <div className="icon">
              <Icon
                onClick={() => {
                  setAnimate(true);
                }}
                type="close"
              />
            </div>
          )}
        </div>
      )}
      <section id="dashboard">
        <div className="home-grid-wrapper">
          <div className="left-sidebar">
            <Sidebar />
          </div>
          <div className="middle-main-body">
            <TopNavBar {...props} />
            <div className="wrap">
              <div className="dashboard-content-body">
                <Route
                  path={props.match.path + "/"}
                  exact
                  component={NewsFeeds}
                />
                <Route
                  path={props.match.path + "/profile"}
                  component={MyProfile}
                />
                <Route
                  path={props.match.path + "/view_profile/:id"}
                  component={UserProfile}
                />
                <Route
                  path={props.match.path + "/admin"}
                  component={AdminPannel}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </LoginGuard>
  );
}

const NewsFeeds = () => {
  return (
    <React.Fragment>
      <div className="content-left">
        <FeedPostMaker />
        <br />
        <DashboardFeeds />
      </div>
      <div>
        <div className="content-right">
          <DashboardEvents />
        </div>
      </div>
    </React.Fragment>
  );
};
