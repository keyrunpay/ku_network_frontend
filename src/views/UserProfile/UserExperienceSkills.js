import React from "react";
import { Timeline, Tag } from "antd";
import { EmptyTag } from "../../helper/config";
import { useUserProfile } from "../../hooks/useProfile";

export default function UserExperienceSkills() {
  const profileData = useUserProfile(true);

  return (
    <React.Fragment>
      <UserExperience data={profileData} />
      <UserSkills data={profileData} />
    </React.Fragment>
  );
}

const UserExperience = props => {
  return (
    <div className="card user-experience">
      <div className="wrap">
        <div className="wrap">
          <header>
            <div className="flex jcsb">
              <h1>Experience Timeline</h1>
              <div>{/* nothing action  */}</div>
            </div>
          </header>
          <div className="content">
            {props.data.experience && props.data.experience.length > 0 ? (
              <Timeline reverse>
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
        <div className="timeline-btn">{/* no btn  */}</div>
      </div>
    </Timeline.Item>
  );
};

const UserSkills = props => {
  return (
    <div className="card user-skills">
      <div className="wrap">
        <div className="wrap">
          <header>
            <div className="flex jcsb">
              <h1>Skilled At</h1>
              {/* no action  */}
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
              {/* no action  */}
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
  return <Tag>{props.title}</Tag>;
};

const InterestPills = props => {
  return <Tag>{props.title}</Tag>;
};
