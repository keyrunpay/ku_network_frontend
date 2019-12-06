import Linkify from "react-linkify";
import parse from "html-react-parser";
import { CustomUserImageViewer } from "../UserImageView/UserImageView";
import { Link } from "react-router-dom";
import React from "react";
import "./_dashboardfeeds.scss";
import { Icon, Divider } from "antd";
import { likePost } from "../../api/ApiCalls";

const componentDecorator = (href, text, key) => (
  // eslint-disable-next-line
  <a href={href} key={text} target="_blank">
    {text}
  </a>
);

export const FeedItem = props => {
  const [liked, setLiked] = React.useState(false);
  const [likeLoading, setLikeLoading] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(false);

  const doLike = () => {
    likePost(props.id)
      .then(res => {
        if (res.liked) {
          setLiked(true);
          setLikeCount(likeCount + 1);
        }
        if (res.unliked) {
          setLiked(false);
          setLikeCount(likeCount - 1);
        }
      })
      .finally(() => {
        setLikeLoading(true);
      });
  };

  React.useEffect(() => {
    if (parseInt(props.likes.liked) === 0) setLiked(false);
    else setLiked(true);
    setLikeCount(props.likes.count);
    // eslint-disable-next-line
  }, [0]);

  return (
    <div className="feed-items">
      <header>
        <div className="flex jcsb">
          <div className="left">
            <div className="flex ci">
              <div className="img cursorp">
                <Link to={"/home/view_profile/" + props.user_id}>
                  <CustomUserImageViewer image={props.user_image} />
                </Link>
              </div>
              <div className="desc">
                <h1>{props.name}</h1>
                <p>
                  {props.user_type}
                  {props.department && props.department !== "null" && (
                    <span>, {props.department}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="right">
            <span className="hover-link">
              <Icon type="ellipsis" />
            </span>
            <p>{props.created_at}</p>
          </div>
        </div>
      </header>

      <div className="post-content">
        <div>
          <Linkify componentDecorator={componentDecorator}>
            {parse(props.body_text)}
          </Linkify>
        </div>
      </div>

      {props.attachment && props.attachment.length > 0 && (
        <React.Fragment>
          <div
            className="post-attachments"
            style={{ marginTop: "25px", marginBottom: "0" }}
          >
            <header style={{ marginBottom: "8px" }}>
              <h1 style={{ marginBottom: "5px" }}>Attachments</h1>
            </header>
            <div className="attachment-content flex ci">
              {props.attachment.map(item => {
                return <FileItem key={item.id} url={item.url} />;
              })}
            </div>
          </div>
        </React.Fragment>
      )}

      <Divider />

      <div className="post-controls">
        <div className="flex ci">
          <div className="like hover-link">
            <Icon
              onClick={() => {
                doLike();
              }}
              type="like"
              theme={liked ? "filled" : "outlined"}
            />
            <span>{likeCount}</span>
          </div>
          <div className="comment hover-link">
            <Icon type="message" /> <span>{props.comments.count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

//// attachment file component
const FileItem = props => {
  const [showFull, setShowFull] = React.useState(false);

  return (
    <React.Fragment>
      {showFull && (
        <div className="full-screen-image-overlay">
          <img src={props.url} alt="" />
          <div
            onClick={() => {
              setShowFull(false);
            }}
            className="overlay"
          ></div>
        </div>
      )}
      <div className="file-item-preview">
        <img
          onClick={() => {
            setShowFull(true);
          }}
          src={props.url}
          alt=""
        />
      </div>
    </React.Fragment>
  );
};
