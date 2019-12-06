import React from "react";
import { Tooltip, Button, Timeline, Tag, Popconfirm, Icon } from "antd";
import { useSelector, useDispatch } from "react-redux";
import AddSkillModal from "./AddSkillModal";
import AddEventModal from "./AddEventModal";
import { removeSkill, removeEvent, removeInterest } from "../../api/ApiCalls";
import { EmptyTag } from "../../helper/config";
import { setProfileInfoFetchState } from "../../redux/actions/profileInfo";
import AddInterestModal from "./AddInterestModal";

export default function MyExperienceSkills() {
  const profileData = useSelector(state => state.profileInfo.responseData);

  return (
    <React.Fragment>
      <UserExperience data={profileData} />
      <UserSkills data={profileData} />
    </React.Fragment>
  );
}

const UserExperience = props => {
  const [showEventModal, setShowEventModal] = React.useState(false);

  return (
    <div className="card user-experience">
      <AddEventModal
        visible={showEventModal}
        onCancelPressed={() => {
          setShowEventModal(false);
        }}
      />
      <div className="wrap">
        <div className="wrap">
          <header>
            <div className="flex jcsb">
              <h1>Experience Timeline</h1>

              <div>
                <Tooltip title="Add new event to timeline">
                  <Button
                    onClick={() => {
                      setShowEventModal(true);
                    }}
                    shape="circle"
                    icon="plus"
                  />
                </Tooltip>
              </div>
            </div>
          </header>
          <div className="content">
            {props.data.experience && props.data.experience.length > 0 ? (
              <Timeline reverse pending="Waiting new one...">
                {props.data.experience.map(item => {
                  return <TimelinePills key={item.id} data={item} />;
                })}
              </Timeline>
            ) : (
              <EmptyTag />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelinePills = props => {
  const dispatch = useDispatch();

  const handleOnDelete = () => {
    removeEvent(props.data.id).then(res => {
      dispatch(setProfileInfoFetchState(true));
    });
  };

  return (
    <Timeline.Item color="green">
      <div className="flex jcsb">
        <div>
          <p>
            {props.data.start_date}-{props.data.end_date}
          </p>
          <p>{props.data.position}</p>
          <p>{props.data.organization_name}</p>
        </div>
        <div className="timeline-btn">
          <Popconfirm
            title="Are you sure delete this event ?"
            onConfirm={() => {
              handleOnDelete();
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button shape="circle" icon="close" />
          </Popconfirm>
        </div>
      </div>
    </Timeline.Item>
  );
};

const UserSkills = props => {
  const [showSkillModal, setShowSkillModal] = React.useState(false);
  const [showInterestModal, setShowInterestModal] = React.useState(false);

  return (
    <div className="card user-skills">
      <AddSkillModal
        visible={showSkillModal}
        onCancelPressed={() => {
          setShowSkillModal(false);
        }}
      />
      <AddInterestModal
        visible={showInterestModal}
        onCancelPressed={() => {
          setShowInterestModal(false);
        }}
      />
      <div className="wrap">
        <div className="wrap">
          <header>
            <div className="flex jcsb">
              <h1>Skilled At</h1>
              <Tooltip title="Add new skill">
                <Button
                  shape="circle"
                  onClick={() => {
                    setShowSkillModal(true);
                  }}
                  icon="plus"
                />
              </Tooltip>
            </div>
          </header>
          <div className="content">
            {props.data.skill &&
              props.data.skill.map(item => {
                return (
                  <SkillPills key={item.id} title={item.name} id={item.id} />
                );
              })}
            {(!props.data.skill || props.data.skill.length === 0) && (
              <EmptyTag />
            )}
          </div>
          <br />
          <div className="gap"></div>
          <header>
            <div className="flex jcsb">
              <h1>Interested In</h1>
              <Tooltip title="Add new interest">
                <Button
                  onClick={() => {
                    setShowInterestModal(true);
                  }}
                  shape="circle"
                  icon="plus"
                />
              </Tooltip>
            </div>
          </header>
          <div className="content">
            {props.data.interest &&
              props.data.interest.map(item => {
                return (
                  <InterestPills key={item.id} title={item.name} id={item.id} />
                );
              })}
            {(!props.data.interest || props.data.interest.length === 0) && (
              <EmptyTag />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillPills = props => {
  const dispatch = useDispatch();

  const handleOnClose = () => {
    removeSkill(props.id).then(res => {
      dispatch(setProfileInfoFetchState(true));
    });
  };

  return (
    <Tag>
      {props.title}
      <Popconfirm
        title="Are you sure delete this skill ?"
        onConfirm={() => {
          handleOnClose();
        }}
        okText="Yes"
        cancelText="No"
      >
        <Icon type="close" />
      </Popconfirm>
    </Tag>
  );
};

const InterestPills = props => {
  const dispatch = useDispatch();

  const handleOnClose = () => {
    removeInterest(props.id).then(res => {
      dispatch(setProfileInfoFetchState(true));
    });
  };

  return (
    <Tag>
      {props.title}
      <Popconfirm
        title="Are you sure delete this interest ?"
        onConfirm={() => {
          handleOnClose();
        }}
        okText="Yes"
        cancelText="No"
      >
        <Icon type="close" />
      </Popconfirm>
    </Tag>
  );
};
