import React from "react";
import { Modal, Input, Form } from "antd";
import { addEvent } from "../../api/ApiCalls";
import { useDispatch } from "react-redux";
import { setProfileInfoFetchState } from "../../redux/actions/profileInfo";

export default function AddEventModal(props) {
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    start_date: "",
    end_date: "",
    organization_name: "",
    position: ""
  });

  const dispatch = useDispatch();

  const addNewEvent = () => {
    const payload = { ...state };
    setLoading(true);
    addEvent(payload)
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
        title="Add Event"
        visible={props.visible}
        maskClosable={false}
        centered
        onCancel={() => {
          props.onCancelPressed();
        }}
        onOk={() => {
          addNewEvent();
        }}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{}}
      >
        <Form>
          <div className="jcsb flex">
            <Form.Item label="Start Date (year)">
              <Input
                placeholder="Start Date"
                onChange={e => {
                  setState({
                    ...state,
                    start_date: e.target.value
                  });
                }}
              />
            </Form.Item>

            <Form.Item label="End Date (year)">
              <Input
                placeholder="End Date"
                onChange={e => {
                  setState({
                    ...state,
                    end_date: e.target.value
                  });
                }}
              />
            </Form.Item>
          </div>

          <Form.Item label="Organization Name">
            <Input
              onChange={e => {
                setState({
                  ...state,
                  organization_name: e.target.value
                });
              }}
              placeholder="Organization Name"
            ></Input>
          </Form.Item>

          <Form.Item label="Position">
            <Input
              onChange={e => {
                setState({
                  ...state,
                  position: e.target.value
                });
              }}
              placeholder="Position"
            ></Input>
          </Form.Item>
        </Form>
        <div className="gap"></div>
      </Modal>
    </div>
  );
}
