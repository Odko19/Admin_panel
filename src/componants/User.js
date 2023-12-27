import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Table, Tag } from "antd";
import UserUpdate from "./User_editor/User_editor";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import "../styles/news.css";

function User() {
  const [data, setData] = useState();
  const [select, setSelect] = useState();
  const [page, setPage] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/users/?page=1&limit=6`)
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            id: row.id,
            firstName: row.firstName,
            permission: row.permission,
            password: row.password,
            location: row.location,
            key: i,
          }))
        );
        setPage(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  let navigate = useNavigate();
  function handleBtnEdit(record) {
    setSelect(record);
  }

  function handleBtnCreate() {
    console.log("hihi");
    navigate("/user/create");
  }

  const columns = [
    {
      title: "Д/д",
      dataIndex: "id",
      key: "key",
      width: "6%",
    },
    {
      title: "Нэр",
      dataIndex: "firstName",
      key: "key",
      width: "20%",
    },
    {
      title: "Зөвшөөрөл",
      dataIndex: "permission",
      key: "key",
      render: (record) => {
        return record.map((e, i) => {
          return (
            <Tag color="magenta" key={i} style={{ margin: "0px 3px 3px 0" }}>
              {e.name}
            </Tag>
          );
        });
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

  // Pagination
  function handlePageChange(page) {
    fetch(`${process.env.REACT_APP_BASE_URL}/users/?page=${page}&limit=6`)
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            id: row.id,
            firstName: row.firstName,
            permission: row.permission,
            password: row.password,
            location: row.location,
            key: i,
          }))
        );
        setPage(result);
      })
      .catch((error) => console.log("error", error));
  }
  // search
  function handleBtnSearch(e) {
    if (e.target.value) {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/users/search?page=1&limit=6&value=${e.target.value}`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(
            result.data.map((row, i) => ({
              id: row.id,
              firstName: row.firstName,
              permission: row.permission,
              password: row.password,
              location: row.location,
              key: i,
            }))
          );
          setPage(result);
        })
        .catch((error) => console.log("error", error));
    }
  }
  return (
    <div className="news">
      {select ? (
        <UserUpdate data={select} className="width" />
      ) : (
        <div>
          <div className="news_content">
            <Button
              type="primary"
              style={{ width: "20%" }}
              onClick={handleBtnCreate}
            >
              Админ нэмэх
            </Button>
            <Input
              onChange={handleBtnSearch}
              placeholder="Нэр"
              className="news_search"
              suffix={<SearchOutlined />}
            />
          </div>
          <Table
            columns={columns}
            dataSource={data}
            className="news_table"
            // pagination={{
            //   position: ["bottomCenter"],
            //   pageSize: page?.currentPageSize,
            //   current: page?.currentPage,
            //   total: page?.totalPages,
            //   onChange: (page) => handlePageChange(page),
            // }}
          />
        </div>
      )}
    </div>
  );
}

export default User;
