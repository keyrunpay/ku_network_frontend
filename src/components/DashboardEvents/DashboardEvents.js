import React from "react";
import "./_dashboardevents.scss";
import { Button, Divider, Dropdown, Menu, Icon } from "antd";
import mockEvent from "../../assets/images/mock-event.png";
import LinesEllipsis from "react-lines-ellipsis";

const menu = (
  <Menu>
    <Menu.Item key="0">
      <p className="font-12 font-bold">Events</p>
    </Menu.Item>
    <Menu.Item key="1">
      <p className="font-12 font-bold" style={{ paddingRight: "20px" }}>
        Opportunities
      </p>
    </Menu.Item>
    <Menu.Item key="3">
      <p className="font-12 font-bold">Jobs</p>
    </Menu.Item>
  </Menu>
);

export default function DashboardEvents() {
  return (
    <div className="dashboard-event-listing">
      <div className="flex jcsb ci">
        <div>
          <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
            <h4 style={{ width: 90 }} className="title hover-link">
              EVENTS <Icon type="down" />
            </h4>
          </Dropdown>
        </div>
        <div className="hover-link">
          <Icon type="plus" style={{ marginRight: "10px" }} />
        </div>
      </div>
      <EventItem />
      <EventItem />
      <EventItem noDivider />
    </div>
  );
}

const EventItem = props => (
  <div className="event-item">
    <header>
      <div className="flex">
        <div className="left">
          <img src={mockEvent} alt="" />
        </div>
        <div className="right">
          <div className="heading">
            <LinesEllipsis
              text="Software that you need"
              maxLine="1"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </div>
          <Button
            type="primary"
            size="small"
            style={{
              fontSize: "11px",
              fontWeight: "700",
              backgroundColor: "#eaf1f9",
              color: "#2b4a91"
            }}
          >
            Read More ..
          </Button>
        </div>
      </div>
    </header>
    <div className="desc">
      <div className="text">
        <LinesEllipsis
          text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos tenetur
  corporis beatae, magnam dolorum maiores nesciunt veritatis adipisci at
  consectetur."
          maxLine="3"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </div>
    </div>
    {!props.noDivider && <Divider style={{ margin: "15px 0 5px 0" }} />}
  </div>
);
