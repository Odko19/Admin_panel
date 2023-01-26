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
    fetch(`${process.env.REACT_APP_BASE_URL}/users`)
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
      width: "50%",
    },
    {
      title: "Зөвшөөрөл",
      dataIndex: "permission",
      key: "key",
      render: (record) => {
        return <Tag color="magenta" key={record}>{record}</Tag>;
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
            <Button   type="primary" style={{width: "20%"}}  onClick={handleBtnCreate}>Админ нэмэх</Button>
            <Input
                                    onChange={e => {
                                      if(e.target.value.length > 0 ){
                                        const filteredData = data.filter(entry =>
                                          entry.firstName.toLowerCase().includes(e.target.value)
                                        );
                                        setData(filteredData);
                                      
                                      } else {
                                        console.log(e.target.value.length)
                                        window.location.reload(false);
                                      }                    
                                                  }}

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
