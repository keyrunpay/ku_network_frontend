import React from "react";
import "./_adminPannel.scss";
import { getPendingRequest } from "../../api/ApiCalls";
import { PendingItem, EmptyPending } from "./PendingItems";
import { Skeleton } from "antd";

export default function AdminPannel() {
  const [state, setState] = React.useState({
    pending: [],
    pendingRequestLoader: false
  });
  const [refreshPage, setRefreshPage] = React.useState(false);

  const fetchPendingRequest = () => {
    setState({ ...state, pending: [], pendingRequestLoader: true });
    getPendingRequest()
      .then(res => {
        setState({ ...state, pending: res, pendingRequestLoader: false });
      })
      .catch(err => {
        setState({ ...state, pending: [], pendingRequestLoader: false });
      });
  };

  React.useEffect(() => {
    fetchPendingRequest();
    // eslint-disable-next-line
  }, [refreshPage]);

  return (
    <div id="admin-pannel">
      {!state.pendingRequestLoader && (
        <React.Fragment>
          {state.pending.length > 0 && (
            <PendingItem
              doRefresh={() => {
                setRefreshPage(!refreshPage);
              }}
              data={state.pending}
            />
          )}
          {state.pending.length <= 0 && <EmptyPending />}
        </React.Fragment>
      )}
      {state.pendingRequestLoader && (
        <React.Fragment>
          <Skeleton active avatar paragraph={{ rows: 3 }} />
          <Skeleton active avatar paragraph={{ rows: 3 }} />
          <Skeleton active avatar paragraph={{ rows: 3 }} />
        </React.Fragment>
      )}
    </div>
  );
}
