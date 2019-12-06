import React from "react";
import "./_myProfile.scss";
import DashboardEvents from "../../components/DashboardEvents/DashboardEvents";
import { NavLink, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyProfileInfo } from "../../api/ApiCalls";
import {
  getProfileInfoSuccess,
  setProfileInfoFetchState
} from "../../redux/actions/profileInfo";
import ProfileIntro from "./ProfileIntro";
import MyInfo from "./MyInfo";
import MyExperienceSkills from "./MyExperienceSkills";
import { Skeleton } from "antd";
import MyPosts from "./MyPosts";

export default function MyProfile(props) {
  const dispatch = useDispatch();
  const profileInfo = useSelector(state => state.profileInfo);

  React.useEffect(() => {
    const getProfileInfoData = () => {
      dispatch(setProfileInfoFetchState(true));
      getMyProfileInfo()
        .then(res => {
          dispatch(setProfileInfoFetchState(false));
          dispatch(getProfileInfoSuccess(res));
        })
        .catch(err => {
          dispatch(setProfileInfoFetchState(false));
          dispatch(getProfileInfoSuccess(err));
        });
    };

    if (!profileInfo.isDataPopulated) {
      getProfileInfoData();
    }
    // eslint-disable-next-line
  }, [profileInfo.isDataPopulated]);

  return (
    <React.Fragment>
      <div className="content-left my-profile-page">
        {profileInfo.isDataPopulated && (
          <React.Fragment>
            <div className="card">
              <ProfileIntro />
            </div>
            <div className="gap"></div>
            <ProfileNavigation />
            <Route path={props.match.path + "/"} exact>
              <MyInfo />
              <div className="flex jcsb">
                <MyExperienceSkills />
              </div>
            </Route>
            <Route path={props.match.path + "/posts"} exact>
              <MyPosts />
            </Route>
          </React.Fragment>
        )}
        {!profileInfo.isDataPopulated && (
          <div>
            <Skeleton active avatar paragraph={{ rows: 3 }} />
            <Skeleton active avatar paragraph={{ rows: 3 }} />
            <Skeleton active avatar paragraph={{ rows: 3 }} />
          </div>
        )}
        <br />
      </div>
      <div>
        <div className="content-right">
          <DashboardEvents />
        </div>
      </div>
    </React.Fragment>
  );
}

export const ProfileNavigation = props => {
  return (
    <div className="my-profile-navigation">
      <div className="wraps">
        <div className="flex">
          <div className="nav-item">
            <NavLink
              exact
              to={props.infoLink ? props.infoLink : "/home/profile"}
              activeClassName="active"
            >
              <p>Information</p>
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink
              exact
              to={props.postLink ? props.postLink : "/home/profile/posts"}
              activeClassName="active"
            >
              <p>Posts</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
