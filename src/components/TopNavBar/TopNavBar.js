import React from "react";
import { Input, Badge, Avatar, Icon, Popover, Button } from "antd";
import "./_topnavbar.scss";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/login";
import { useImage } from "../UserImageView/UserImageView";
import { EmptyTag, checkResponse } from "../../helper/config";
import { getNotification } from "../../api/ApiCalls";

const GetIcon = props => {
  if (props.type === "Info") return <Icon type="info-circle" theme="twoTone" />;
  if (props.type === "Success")
    return <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />;
  if (props.type === "Error")
    return <Icon type="close-circle" theme="twoTone" twoToneColor="#f5222d" />;
  if (props.type === "Warn")
    return (
      <Icon type="exclamation-circle" theme="twoTone" twoToneColor="#faad14" />
    );
  return <Icon type="info-circle" theme="twoTone" />;
};

const NoticeItemPills = props => {
  const haveLink = checkResponse(props.goto_url);

  const handleOnClick = () => {
    if (haveLink) {
      props.hidePop();
      props.history.push(props.goto_url);
    }
  };

  return (
    <div
      onClick={() => {
        handleOnClick();
      }}
      className={`flex ci jcsb notice-item ${haveLink && "cursorp"}`}
    >
      <div className="flex">
        <p>
          <GetIcon type={props.type} />
        </p>
        <p style={{ marginLeft: "7px", marginTop: "-1px" }}>
          {props.notification_text}
        </p>
      </div>
      {haveLink && (
        <div className="ico">
          <Icon
            type="right-circle"
            style={{ marginTop: "2px", color: "#555" }}
            theme="outlined"
          />
        </div>
      )}
    </div>
  );
};

const NotificationPills = props => {
  const [state, setState] = React.useState([
    { id: 0, type: "Error", notification_text: "No any notification found" }
  ]);

  React.useEffect(() => {
    const fetchNotice = () => {
      getNotification().then(res => {
        setState(res);
      });
    };

    fetchNotice();
    //eslint-disable-next-line
  }, [0]);

  return (
    <div style={{ width: "250px" }}>
      {state.length === 0 && (
        <div>
          <EmptyTag />
        </div>
      )}
      {state.length > 0 && (
        <div>
          {state.map(item => {
            return <NoticeItemPills key={item.id} {...item} {...props} />;
          })}
        </div>
      )}
    </div>
  );
};

export default function TopNavBar(props) {
  const dispatch = useDispatch();
  const userImg = useImage();
  const [showPop, setShowPop] = React.useState(false);

  const onLogoutPressed = () => {
    localStorage.removeItem("login_data");
    localStorage.removeItem("token");
    props.history.push("/login");
    dispatch(logoutUser());
  };

  const menu2 = (
    <div>
      <Button
        onClick={() => {
          onLogoutPressed();
        }}
      >
        LogOut
      </Button>
    </div>
  );
  return (
    <React.Fragment>
      <div id="top-nav-bar">
        <div className="top-bar-left-item">
          <Input.Search
            placeholder="Search ..."
            onSearch={value => console.log(value)}
            style={{ minWidth: 250 }}
          />
        </div>
        <div className="top-bar-right-item">
          <div className="flex ci">
            <div
              className="notification-bell-icon"
              style={{ cursor: "pointer" }}
            >
              <Popover
                visible={showPop}
                onVisibleChange={visible => {
                  setShowPop(visible);
                }}
                placement="bottomRight"
                content={
                  <NotificationPills
                    {...props}
                    hidePop={() => {
                      setShowPop(false);
                    }}
                  />
                }
                trigger="click"
              >
                <Badge
                  dot
                  style={{
                    marginTop: "4px",
                    marginRight: "10px",
                    width: "9px",
                    height: "9px"
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "transparent",
                      marginRight: "10px"
                    }}
                    size="small"
                  >
                    <Icon
                      type="bell"
                      theme="outlined"
                      style={{ color: "#000" }}
                      twoToneColor="#000000"
                    />
                  </Avatar>
                </Badge>
              </Popover>
            </div>
            <div className="user-setting-option">
              <Popover placement="bottomRight" content={menu2} trigger="click">
                <Avatar src={userImg} />
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
