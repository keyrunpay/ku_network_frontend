import React from "react";
import { Modal, Form, Select, notification } from "antd";
import { rejectUserAdmin } from "../../api/ApiCalls";

export default function ProfileRejectionModal(props) {
  const [loading, setLoading] = React.useState(false);
  const [rejectionReason, setRejectionReason] = React.useState(
    "Document not acceptable"
  );

  const doReject = () => {
    const payload = { reason: rejectionReason };
    setLoading(true);
    rejectUserAdmin(props.user_id, payload)
      .then(res => {
        props.onCancelPressed();
        props.doRefresh();
      })
      .catch(err => {
        if (err.reason) {
          notification.error({ message: err.reason });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Modal
        title="Reject user profile"
        width={300}
        visible={props.visible}
        maskClosable={false}
        centered
        onCancel={() => {
          props.onCancelPressed();
        }}
        onOk={() => {
          doReject();
        }}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{}}
      >
        <Form>
          <Form.Item label="Rejection Reason">
            <Select
              onChange={value => {
                setRejectionReason(value);
              }}
              defaultValue="Document not acceptable"
            >
              <Select.Option value="Document not acceptable">
                Document not acceptable
              </Select.Option>
              <Select.Option value="Incomplete profile details">
                Incomplete profile details
              </Select.Option>
            </Select>
          </Form.Item>
          <div className="gap"></div>
        </Form>
      </Modal>
    </div>
  );
}
