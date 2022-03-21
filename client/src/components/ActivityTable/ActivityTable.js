import React from "react";
import Styles from "./ActivityTable.module.scss";
import { Table, Space, Tag } from "antd";
function ActivityTable({ data }) {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <p>{text}</p>,
    },

    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (tag) => (
        <Tag color="geekblue" key={tag}>
          {tag.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Details",
      key: "details",
      dataIndex: "details",
      render: (details) => (
        <>
          {details.map((tag, index) => {
            return (
              <option value={tag} key={index}>
                {tag}
              </option>
            );
          })}
        </>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} />;
}

export default ActivityTable;
