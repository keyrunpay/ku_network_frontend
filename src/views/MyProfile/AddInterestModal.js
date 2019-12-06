import React from "react";
import { Modal, Input, Form } from "antd";
import { addInterest } from "../../api/ApiCalls";
import { useDispatch } from "react-redux";
import { setProfileInfoFetchState } from "../../redux/actions/profileInfo";

export default function AddInterestModal(props) {
  const [loading, setLoading] = React.useState(false);
  const [InterestName, setInterestName] = React.useState("");

  const dispatch = useDispatch();

  const addNewInterest = () => {
    const payload = { name: InterestName };
    setLoading(true);
    addInterest(payload)
      .then(res => {
        props.onCancelPressed();
        dispatch(setProfileInfoFetchState(true));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Modal
        title="Add Interest"
        width={300}
        visible={props.visible}
        maskClosable={false}
        centered
        onCancel={() => {
          props.onCancelPressed();
        }}
        onOk={() => {
          addNewInterest();
        }}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{}}
      >
        <Form>
          <Form.Item label="Interest Name">
            <Input
              onChange={e => {
                setInterestName(e.target.value);
              }}
              onKeyUp={e => {
                if (e.which === 13) {
                  addNewInterest();
                }
              }}
              placeholder="Interest Name"
            ></Input>
          </Form.Item>
          <div className="gap"></div>
        </Form>
      </Modal>
    </div>
  );
}
