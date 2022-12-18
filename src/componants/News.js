import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Table } from "antd";
import EditorUpdate from "./Editor/EditorUpdate";
import moment from "moment";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../styles/news.css";

function Content() {
  const [data, setData] = useState();
  const [select, setSelect] = useState();
  const [page, setPage] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/v1/news/?page=1&limit=6")
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            title: row.title,
            created_by: row.created_by,
            created_at: moment(row.created_at).format("L"),
            cover_img: row.cover_img,
            expires_at: row.expires_at,
            type: row.type,
            id: row.id,
            body: row.body,
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
    navigate("/editor", {
      state: "news",
    });
  }

  function handlePageChange(page) {
    fetch(`http://localhost:3001/v1/news/?page=${page}&limit=6`)
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            title: row.title,
            created_by: row.created_by,
            created_at: moment(row.created_at).format("L"),
            cover_img: row.cover_img,
            expires_at: row.expires_at,
            type: row.type,
            id: row.id,
            body: row.body,
            key: i,
          }))
        );
        setPage(result);
      })
      .catch((error) => console.log("error", error));
  }

  function handlerBtnDlt(id) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`http://localhost:3001/v1/news/?id=${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  const columns = [
    {
      title: "Гарчиг",
      dataIndex: "title",
      key: "key",
    },
    {
      title: "Огноо",
      dataIndex: "created_at",
      key: "key",
    },
    {
      title: "Төрөл",
      dataIndex: "type",
      key: "key",
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
    {
      title: "Устгах",
      key: "key",
      dataIndex: "key",
      render: (text, record) => (
        <button className="btnDlt" onClick={() => handlerBtnDlt(record.id)}>
          <DeleteOutlined />
        </button>
      ),
    },
  ];

  return (
    <div className="news">
      {select ? (
        <EditorUpdate data={select} type={"news"} className="width" />
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
              pageSize: page?.currentPageSize,
              current: page?.currentPage,
              total: page?.totalDatas,
              onChange: (page) => handlePageChange(page),
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Content;
