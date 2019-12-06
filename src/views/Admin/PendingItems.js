import React from "react";
import { verifyUserAdmin } from "../../api/ApiCalls";
import { cleanseResponse, EmptyTag } from "../../helper/config";
import { Button, Menu, Dropdown, Popconfirm } from "antd";
import { CustomUserImageViewer } from "../../components/UserImageView/UserImageView";
import ProfileRejectionModal from "./ProfileRejectionModal";

export const EmptyPending = () => {
  return (
    <div className="pendings">
      <header>
        <h1>Pending Item</h1>
      </header>
      <br />
      <div className="flex">
        <EmptyTag message="No any pending item found" />
      </div>
    </div>
  );
};

export const PendingItem = props => {
  return (
    <div className="pendings">
      <header>
        <h1>Pending Item</h1>
      </header>
      <div className="content">
        {props.data.map(item => {
          return (
            <PendingPills key={item.id} {...item} doRefresh={props.doRefresh} />
          );
        })}
      </div>
    </div>
  );
};

const PendingPills = props => {
  const [state, setState] = React.useState({
    verifyUserLoading: false
  });
  const [showRejectModal, setShowRejectModal] = React.useState(false);

  const verifyThisUser = () => {
    setState({ ...state, verifyUserLoading: true });
    verifyUserAdmin(props.user_id)
      .then(res => {
        props.doRefresh();
      })
      .finally(() => {
        setState({ ...state, verifyUserLoading: false });
      });
  };

  const ActionMenu = () => {
    return (
      <Menu>
        <div className="menu-item-custom" key="0item">
          <a
            href={"/home/view_profile/" + props.user_id}
            target="_blank"
            rel="noopener noreferrer"
          >
            View User Profile
          </a>
        </div>

        {props.files && props.files.length > 0 && (
          <React.Fragment>
            {props.files.map((item, index) => {
              return (
                <div className="menu-item-custom" key={item.id}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    Verification File {index + 1}
                  </a>
                </div>
              );
            })}
          </React.Fragment>
        )}
      </Menu>
    );
  };

  return (
    <React.Fragment>
      <ProfileRejectionModal
        visible={showRejectModal}
        user_id={props.user_id}
        doRefresh={props.doRefresh}
        onCancelPressed={() => {
          setShowRejectModal(false);
        }}
      />
      <div className="pending-item card flex ci jcsb">
        <div className="flex ci">
          <div className="image">
            <CustomUserImageViewer image={props.user_image} />
          </div>
          <div className="names">
            <h2>{props.name}</h2>
            <p>{props.email}</p>
          </div>
          <div className="types">
            <h2>{props.type}</h2>
            <p>Action Target: {cleanseResponse(props.target)}</p>
          </div>
        </div>
        <div className="actions">
          <p>{props.created_at}</p>

          <Dropdown
            overlay={ActionMenu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button shape="circle" icon="eye" />
          </Dropdown>
          <Button
            shape="circle"
            onClick={() => {
              setShowRejectModal(true);
            }}
            icon="close-circle"
            type="danger"
          />

          <Popconfirm
            title="Are you sure you want to verify this user ?"
            onConfirm={() => {
              verifyThisUser();
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              shape="circle"
              loading={state.verifyUserLoading}
              icon="check-circle"
              type="primary"
            />
          </Popconfirm>
        </div>
      </div>
    </React.Fragment>
  );
};
