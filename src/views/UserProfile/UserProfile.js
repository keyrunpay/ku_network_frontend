import React from "react";
// import "./_myProfile.scss";
import DashboardEvents from "../../components/DashboardEvents/DashboardEvents";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../api/ApiCalls";
import { Skeleton } from "antd";
// import MyPosts from "./MyPosts";
import { ProfileNavigation } from "../MyProfile/MyProfile";
import UserProfileIntro from "./UserProfileIntro";
import UserInfo from "./UserInfo";
import UserExperienceSkills from "./UserExperienceSkills";
import { cleanseUrl } from "../../helper/config";
import { useUserProfile } from "../../hooks/useProfile";
import {
  setUserProfileLoadingStatus,
  getUserProfileSuccess,
  getUserProfileFailed
} from "../../redux/actions/userProfile";
import UserPosts from "./UserPost";
import { setMyPostLoadingState } from "../../redux/actions/myPost";

export default function UserProfile(props) {
  const dispatch = useDispatch();
  const profileInfo = useUserProfile();

  React.useEffect(() => {
    const getProfileInfoData = () => {
      dispatch(setUserProfileLoadingStatus(true));
      getUserProfile(props.match.params.id)
        .then(res => {
          dispatch(setUserProfileLoadingStatus(false));
          dispatch(getUserProfileSuccess(res));
        })
        .catch(err => {
          dispatch(setUserProfileLoadingStatus(false));
          dispatch(getUserProfileFailed(err));
          if (err.redirect) {
            setTimeout(() => {
              props.history.push("/home");
            }, 150);
          }
        });
    };

    if (!profileInfo.isDataPopulated) {
      getProfileInfoData();
    }
    // eslint-disable-next-line
  }, [profileInfo.isDataPopulated]);

  React.useEffect(() => {
    if (profileInfo.isDataPopulated) {
      if (
        parseInt(profileInfo.responseData.id) !==
        parseInt(props.match.params.id)
      ) {
        dispatch(setUserProfileLoadingStatus(true));
      }
      dispatch(setMyPostLoadingState(true));
    }
    return () => {
      dispatch(setMyPostLoadingState(true));
    };
    // eslint-disable-next-line
  }, [props.match.params.id]);

  return (
    <React.Fragment>
      <div className="content-left my-profile-page">
        {profileInfo.isDataPopulated && (
          <React.Fragment>
            <div className="card">
              <UserProfileIntro />
            </div>
            <div className="gap"></div>
            <ProfileNavigation
              infoLink={cleanseUrl(props.match.url) + "/"}
              postLink={cleanseUrl(props.match.url) + "/posts"}
            />
            <Route path={props.match.path + "/"} exact>
              <UserInfo />
              <div className="flex jcsb">
                <UserExperienceSkills />
              </div>
            </Route>
            <Route path={props.match.path + "/posts"} exact>
              <UserPosts id={props.match.params.id} />
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
