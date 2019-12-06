import React from "react";
import mockUserImg from "../../assets/images/avatar-male.png";
import verifiedSvg from "../../assets/svgs/correct.svg";
import { Icon, Button, Popover, notification } from "antd";
import { useDispatch } from "react-redux";
import { cleanseResponse, checkResponse } from "../../helper/config";
import { uploadFile, updateDp, submitProfileVerify } from "../../api/ApiCalls";
import { useProfile } from "../../hooks/useProfile";
import { setProfileInfoFetchState } from "../../redux/actions/profileInfo";

const ProfileIntro = () => {
  const [state, setState] = React.useState({
    profileImageFile: null,
    profileImageLoading: false,
    verifyFile: null,
    verifyFileLoading: false,
    verifyRequestLoading: false
  });
  const fileRef = React.createRef();
  const verifyFileRef = React.createRef();

  const profileData = useProfile();
  const dispatch = useDispatch();

  const submitVerify = () => {
    setState({ ...state, verifyRequestLoading: true });

    submitProfileVerify().finally(() => {
      setState({ ...state, verifyRequestLoading: false });
    });
  };

  React.useEffect(() => {
    const changeDp = () => {
      const data = new FormData();
      data.append("file", state.profileImageFile);
      data.append("file_for", "dp");
      data.append("file_type", "image");
      setState({ ...state, profileImageLoading: true });

      uploadFile(data)
        .then(res => {
          updateDp({ file_id: res.id })
            .then(res => {
              dispatch(setProfileInfoFetchState(true));
            })
            .finally(() => {
              setState({ ...state, profileImageLoading: false });
            });
        })
        .catch(err => {
          setState({ ...state, profileImageLoading: false });
        });
    };

    if (state.profileImageFile !== null) {
      changeDp();
    }
    // eslint-disable-next-line
  }, [state.profileImageFile]);

  React.useEffect(() => {
    const sendVerifyFile = () => {
      const data = new FormData();
      data.append("file", state.verifyFile);
      data.append("file_for", "verification");
      data.append("file_type", "image");
      setState({ ...state, verifyFileLoading: true });

      uploadFile(data)
        .then(res => {
          notification.success({
            message: "File for verification uploaded successfully"
          });
        })
        .finally(() => {
          setState({ ...state, verifyFileLoading: false });
        });
    };

    if (state.verifyFile !== null) {
      sendVerifyFile();
    }
    // eslint-disable-next-line
  }, [state.verifyFile]);

  return (
    <div className="my-profile-intro">
      <input
        type="file"
        onChange={e => {
          setState({ ...state, verifyFile: e.target.files[0] });
        }}
        ref={verifyFileRef}
        style={{ display: "none" }}
      />
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
                <div
                  onClick={() => {
                    fileRef.current.click();
                  }}
                  className={`overlay ${state.profileImageLoading &&
                    "loading"}`}
                >
                  {state.profileImageLoading && (
                    <span className="loader">
                      <Icon
                        type="loading"
                        style={{ fontSize: "30px", color: "#1890ff" }}
                      />
                    </span>
                  )}
                </div>
                <input
                  type="file"
                  onChange={e => {
                    setState({ ...state, profileImageFile: e.target.files[0] });
                  }}
                  ref={fileRef}
                  style={{ display: "none" }}
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
            <span className="hover-link">
              <Icon type="ellipsis" />
            </span>

            {!checkResponse(profileData.verification_status) && (
              <div className="iconBtn">
                <div className="flex ci jcr">
                  <Button
                    loading={state.verifyFileLoading}
                    onClick={() => {
                      verifyFileRef.current.click();
                    }}
                  >
                    Verification Document
                  </Button>
                  <div style={{ marginRight: "5px" }}></div>
                  <Popover
                    placement="left"
                    title={
                      <span style={{ fontSize: "12px", fontWeight: "700" }}>
                        Profile Verification Procedure
                      </span>
                    }
                    content={
                      <p class="info-profile-verify">
                        <ul>
                          <li>
                            Submit Verification Document (i.e academic document
                            that prove you have connection with
                            <b> Kathmandu University</b>)
                          </li>
                          <li>You can attach more than one document</li>
                          <li>Fill up your profile details</li>
                          <li>Request your profile for verification</li>
                          <li>You request will be processed within 24 hour</li>
                        </ul>
                      </p>
                    }
                    trigger="click"
                  >
                    <Button shape="circle" icon="info"></Button>
                  </Popover>
                </div>
                <div className="gap"></div>
                <div>
                  <Button
                    type="primary"
                    loading={state.verifyRequestLoading}
                    onClick={() => {
                      submitVerify();
                    }}
                  >
                    Request Profile Verification
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileIntro;
