import React from "react";
import mockUserImg from "../../assets/images/avatar-male.png";
import verifiedSvg from "../../assets/svgs/correct.svg";
import { cleanseResponse, checkResponse } from "../../helper/config";
import { useUserProfile } from "../../hooks/useProfile";

const UserProfileIntro = () => {
  const profileData = useUserProfile(true);

  return (
    <div className="my-profile-intro">
      <div className="wrap">
        <div className="flex jcsb">
          <div className="my-profile-left">
            <div className="flex ci">
              <div className="img">
                <img
                  src={
                    checkResponse(profileData.profile_image)
                      ? profileData.profile_image
                      : mockUserImg
                  }
                  alt=""
                />
              </div>
              <div className="desc">
                <h1 className="font-14 font-bold">
                  {profileData.name}
                  {checkResponse(profileData.verification_status) && (
                    <span>
                      <img
                        style={{
                          width: "18px",
                          height: "18px",
                          boxShadow: "none",
                          marginLeft: "7px"
                        }}
                        src={verifiedSvg}
                        alt=""
                      />
                    </span>
                  )}
                </h1>
                <p className="font-13">
                  {profileData.user_type}
                  {checkResponse(profileData.program) && ", "}
                  {cleanseResponse(profileData.program, "")}
                </p>
                <div className="short-bio">
                  {cleanseResponse(profileData.short_bio, "No short bio found")}
                </div>
              </div>
            </div>
          </div>
          <div className="my-profile-right">
            {/* <span className="hover-link">
              <Icon type="ellipsis" />
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileIntro;
