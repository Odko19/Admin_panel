import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Table, Tag } from "antd";
import UserUpdate from "./User_editor/User_editor";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import "../styles/news.css";

function User() {
  const [data, setData] = useState();
  const [select, setSelect] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/v1/users")
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            firstName: row.firstName,
            permission: row.permission,
            password: row.password,
            key: i,
          }))
        );
      })
      .catch((error) => console.log("error", error));
  }, []);

  let navigate = useNavigate();
  function handleBtnEdit(record) {
    setSelect(record);
  }

  function handleBtnCreate() {
    navigate("/user/create");
  }

  const columns = [
    {
      title: "Нэр",
      dataIndex: "firstName",
      key: "key",
    },
    {
      title: "Зөвшөөрөл",
      dataIndex: "permission",
      key: "key",
      render: (record) => {
        return <Tag key={record}>{record}</Tag>;
      },
    },
    {
      title: "Засах",
      key: "key",
      dataIndex: "key",
      render: (text, record) => (
        <button className="btnEdit" onClick={() => handleBtnEdit(record)}>
          <EditOutlined />
        </button>
      ),
    },
  ];

  return (
    <div className="news">
      {select ? (
        <UserUpdate data={select} className="width" />
      ) : (
        <div>
          <div className="news_content">
            <Button onClick={handleBtnCreate}>Мэдээ нэмэх</Button>
            <Input
              placeholder="Нэр"
              className="news_search"
              suffix={<SearchOutlined />}
            />
          </div>
          <Table
            columns={columns}
            dataSource={data}
            className="news_table"
            pagination={{
              position: ["bottomCenter"],
            }}
          />
        </div>
      )}
    </div>
  );
}

export default User;
