import React from "react";
import { Modal, Input, Form } from "antd";
import { addSkill } from "../../api/ApiCalls";
import { useDispatch } from "react-redux";
import { setProfileInfoFetchState } from "../../redux/actions/profileInfo";

export default function AddSkillModal(props) {
  const [loading, setLoading] = React.useState(false);
  const [skillName, setSkillName] = React.useState("");

  const dispatch = useDispatch();

  const addNewSkill = () => {
    const payload = { name: skillName };
    setLoading(true);
    addSkill(payload)
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
        title="Add Skill"
        width={300}
        visible={props.visible}
        maskClosable={false}
        centered
        onCancel={() => {
          props.onCancelPressed();
        }}
        onOk={() => {
          addNewSkill();
        }}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{}}
      >
        <Form>
          <Form.Item label="Skill Name">
            <Input
              onChange={e => {
                setSkillName(e.target.value);
              }}
              onKeyUp={e => {
                if (e.which === 13) {
                  addNewSkill();
                }
              }}
              placeholder="Skill Name"
            ></Input>
          </Form.Item>
          <div className="gap"></div>
        </Form>
      </Modal>
    </div>
  );
}
