import React from "react";
import { Modal, Input, Form, Select, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { cleanseResponse } from "../../helper/config";
import { changeOneProfileValue } from "../../redux/actions/profileInfo";
import moment from "moment";
import { editMyProfileInfo } from "../../api/ApiCalls";
import TextArea from "antd/lib/input/TextArea";

export default function EditProfileModal(props) {
  const profileData = useSelector(state => state.profileInfo.responseData);

  const [loading, setLoading] = React.useState(false);
  const updateProfile = () => {
    setLoading(true);
    editMyProfileInfo(profileData)
      .then(res => {
        props.onCancelPressed();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Modal
        title="Edit Profile Details"
        visible={props.visible}
        maskClosable={false}
        centered
        onCancel={() => {
          props.onCancelPressed();
        }}
        onOk={() => {
          updateProfile();
        }}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{}}
      >
        <EditProfileForm />
      </Modal>
    </div>
  );
}

function EditProfileForm() {
  const dispatch = useDispatch();
  const profileData = useSelector(state => state.profileInfo.responseData);

  return (
    <Form>
      <Form.Item label="Short Bio">
        <TextArea
          defaultValue={cleanseResponse(profileData.short_bio, "")}
          onChange={e => {
            dispatch(
              changeOneProfileValue({ key: "short_bio", value: e.target.value })
            );
          }}
        ></TextArea>
      </Form.Item>
      <div className="flex jcsb">
        <div>
          <Form.Item label="School">
            <Select
              placeholder="Select School"
              defaultValue={cleanseResponse(profileData.school, "")}
              onChange={value => {
                dispatch(changeOneProfileValue({ key: "school", value }));
              }}
            >
              <Select.Option key="School of Engineering">
                School of Engineering
              </Select.Option>
              <Select.Option key="School of Science">
                School of Science
              </Select.Option>
              <Select.Option key="None">None</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Department">
            <Select
              placeholder="Select Department"
              defaultValue={cleanseResponse(profileData.department, "")}
              onChange={value => {
                dispatch(changeOneProfileValue({ key: "department", value }));
              }}
            >
              <Select.Option key="DoCSE">DoCSE</Select.Option>
              <Select.Option key="None">None</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Program">
            <Select
              placeholder="Select Program"
              defaultValue={cleanseResponse(profileData.program, "")}
              onChange={value => {
                dispatch(changeOneProfileValue({ key: "program", value }));
              }}
            >
              <Select.Option value="Computer Science">
                Computer Science
              </Select.Option>
              <Select.Option value="Computer Engineering">
                Computer Engineering
              </Select.Option>
              <Select.Option value="None">None</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Batch">
            <Input
              placeholder="Batch"
              defaultValue={cleanseResponse(profileData.batch, "")}
              onKeyUp={e => {
                dispatch(
                  changeOneProfileValue({ key: "batch", value: e.target.value })
                );
              }}
            ></Input>
          </Form.Item>
        </div>
        <div>
          <Form.Item
            label="Registration Number"
            help="Registration number will be kept secret"
          >
            <Input
              placeholder="Registration Number"
              defaultValue={cleanseResponse(
                profileData.registration_number,
                ""
              )}
              onKeyUp={e => {
                dispatch(
                  changeOneProfileValue({
                    key: "registration_number",
                    value: e.target.value
                  })
                );
              }}
            ></Input>
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            help="Date of birth will be kept secret"
          >
            <DatePicker
              onChange={value => {
                dispatch(
                  changeOneProfileValue({
                    key: "date_of_birth",
                    value: value.format("YYYY-MM-DD")
                  })
                );
              }}
              defaultValue={moment(
                cleanseResponse(profileData.date_of_birth, "1999-09-09"),
                "YYYY-MM-DD"
              )}
            />
          </Form.Item>
          <Form.Item label="Phone" help="Phone number will be kept secret">
            <Input
              placeholder="Phone"
              defaultValue={cleanseResponse(profileData.phone, "")}
              onKeyUp={e => {
                dispatch(
                  changeOneProfileValue({
                    key: "phone",
                    value: e.target.value
                  })
                );
              }}
            ></Input>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
}
