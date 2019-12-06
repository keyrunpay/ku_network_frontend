import { Empty } from "antd";
import React from "react";
import emptyImage from "../assets/svgs/empty.svg";

// export const baseUrl = "//pratitrajgiri.com.np/alumni/api/public/";
export const baseUrl = "//localhost/alu/public/";

export const cleanseResponse = (text, na = "N/A") => {
  if (!text) return na;
  if (text === "0") return na;
  if (text === "null") return na;
  if (text === " ") return na;
  return text;
};

export const checkResponse = text => {
  if (!text) return false;
  if (text === "0") return false;
  if (text === "null") return false;
  if (text === " ") return false;
  return true;
};

export const EmptyTag = props => {
  return (
    <Empty
      description={
        <span style={{ color: "red", fontWeight: "500", fontSize: "12px" }}>
          {props.message || "Nothing Found"}
        </span>
      }
      image={emptyImage}
      imageStyle={{ height: 70 }}
    />
  );
};

export const cleanseUrl = url => {
  if (url.endsWith("/")) return url.substring(0, url.length - 1);
  return url;
};
