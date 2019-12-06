import React from "react";
import "./_sidebar.scss";
import { ReactComponent as OpportunityIcon } from "../../assets/svgs/opportunity.svg";
import { ReactComponent as JobIcon } from "../../assets/svgs/job.svg";
import { Icon, Badge } from "antd";
import { NavLink } from "react-router-dom";
import { useProfile, isVerified } from "../../hooks/useProfile";

function SidebarItem(props) {
  const itemRef = React.createRef();

  return (
    <div
      onClick={props.onClick && props.onClick}
      className="sidebar-item flex jcsb ci"
    >
      <div className="flex ci">
        <div className="icon">{props.icon}</div>
        <div className="text">
          <p>{props.text}</p>
        </div>
      </div>
      <div className="redlabel" ref={itemRef} style={{ marginRight: "25px" }}>
        {props.enableBadge && <Badge status={props.status} />}
      </div>
    </div>
  );
}

function Sidebar() {
  const profile = useProfile();
  const verified = isVerified(profile);

  const isAdmin = () => {
    if (profile && profile.role === 111) return true;
    return false;
  };

  return (
    <div id="main-sidebar">
      <header>
        <h1>Alumni Network</h1>
      </header>
      <div className="sidebar-contents">
        <NavLink activeClassName="active" exact to="/home">
          <SidebarItem text="News Feeds" icon={<Icon type="read" />} />
        </NavLink>
        <NavLink activeClassName="active" to="/home/profile">
          <SidebarItem
            enableBadge={!verified}
            text="My Profile"
            status="error"
            icon={<Icon type="user" />}
          />
        </NavLink>

        <NavLink activeClassName="active" to="/home/events">
          <SidebarItem text="Events" icon={<Icon type="carry-out" />} />
        </NavLink>
        <NavLink activeClassName="active" to="/home/opportunity">
          <SidebarItem text="Opportunities" icon={<OpportunityIcon />} />
        </NavLink>

        <SidebarItem text="Jobs" icon={<JobIcon />} />
        <SidebarItem text="Donations" icon={<Icon type="dollar" />} />
        {isAdmin() && (
          <NavLink activeClassName="active" exact to="/home/admin">
            <SidebarItem
              enableBadge
              status="processing"
              text="Admin Pannel"
              icon={<Icon type="crown" />}
            />
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
