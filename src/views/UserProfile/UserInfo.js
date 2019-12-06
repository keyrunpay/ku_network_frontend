import React from "react";
import { cleanseResponse } from "../../helper/config";
import { useUserProfile } from "../../hooks/useProfile";

const UserInfo = () => {
  const profileData = useUserProfile();

  return (
    <div className="card my-profile-info">
      <div className="right-action">{/* no action */}</div>
      <div className="wrap">
        <div className="flex">
          <div className="info-left">
            <p>
              User Type:{" "}
              <span>{cleanseResponse(profileData.responseData.user_type)}</span>
            </p>
            <p>
              Gender:{" "}
              <span>{cleanseResponse(profileData.responseData.gender)}</span>
            </p>
            <p>
              School:{" "}
              <span>{cleanseResponse(profileData.responseData.school)}</span>
            </p>
            <p>
              Department:{" "}
              <span>
                {cleanseResponse(profileData.responseData.department)}
              </span>
            </p>
            <p>
              Program:{" "}
              <span>{cleanseResponse(profileData.responseData.program)}</span>
            </p>
          </div>
          <div className="info-right">
            <p>
              Batch:{" "}
              <span>{cleanseResponse(profileData.responseData.batch)}</span>
            </p>
            <p>
              Reg. Number:
              <span>
                {" "}
                {cleanseResponse(profileData.responseData.registration_number)}
              </span>
            </p>
            <p>
              Date of Birth:
              <span>
                {" "}
                {cleanseResponse(profileData.responseData.date_of_birth)}
              </span>
            </p>
            <p>
              Phone:{" "}
              <span>{cleanseResponse(profileData.responseData.phone)}</span>
            </p>
            <p>
              Joined At: <span>{profileData.responseData.joined_at}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
