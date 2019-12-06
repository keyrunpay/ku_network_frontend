import React from "react";
import "./_dashboardfeeds.scss";
import { Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../api/ApiCalls";
import {
  getPostSuccess,
  setPostLoadingState,
  getPostFailure
} from "../../redux/actions/posts";
import { FeedItem } from "./PostItem";

export default function DashboardFeeds() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post);

  React.useEffect(() => {
    const fetchPost = () => {
      dispatch(setPostLoadingState(true));
      getPost()
        .then(res => {
          dispatch(getPostSuccess(res));
        })
        .catch(err => {
          dispatch(getPostFailure(err));
        });
    };

    if (!posts.isDataPopulated) {
      fetchPost();
    }
    // eslint-disable-next-line
  }, [posts.isDataPopulated]);

  return (
    <div className="dashboard-feeds-wrapper">
      {posts.isLoading && (
        <div>
          <Skeleton avatar paragraph={{ rows: 3 }} />
          <Skeleton avatar paragraph={{ rows: 3 }} />
          <Skeleton avatar paragraph={{ rows: 3 }} />
        </div>
      )}
      {posts.isDataPopulated && (
        <React.Fragment>
          {posts.postData.map(item => {
            return <FeedItem key={"post" + item.id} {...item} />;
          })}
        </React.Fragment>
      )}
    </div>
  );
}
