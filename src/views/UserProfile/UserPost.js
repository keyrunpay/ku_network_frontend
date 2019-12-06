import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton } from "antd";
import { getUserPost } from "../../api/ApiCalls";
import {
  setMyPostLoadingState,
  getMyPostSuccess,
  getMyPostFailed
} from "../../redux/actions/myPost";
import { FeedItem } from "../../components/DashboardFeeds/PostItem";

export default function UserPosts(props) {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.myPost);

  React.useEffect(() => {
    const fetchPost = () => {
      dispatch(setMyPostLoadingState(true));
      getUserPost(props.id)
        .then(res => {
          dispatch(getMyPostSuccess(res));
        })
        .catch(err => {
          dispatch(getMyPostFailed(err));
        });
    };
    if (!posts.isDataPopulated) {
      fetchPost();
    }
    //eslint-disable-next-line
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
          {posts.responseData.map(item => {
            return <FeedItem key={"post" + item.id} {...item} />;
          })}
        </React.Fragment>
      )}
    </div>
  );
}
