import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Table, notification } from "antd";
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

  // Notif
  // let url=`http://localhost:3000/${}`;
  const openNotification = (type) => {
    if (type === "success") {
      notification[type]({
        message: "Амжилттай устгагдлаа",
        duration: 3,
      });
    } else {
      notification[type]({
        message: "Error",
        duration: 3,
      });
    }
  };

  //

  // GET

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/news/?page=1&limit=6`)
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            title: row.title,
            created_by: row.created_by,
            created_at: moment(row.created_at).format("L"),
            cover_img: row.cover_img,
            expires_at: moment(row.expires_at).format("L"),
            customer_type: row.customer_type,
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
  // Pagination
  function handlePageChange(page) {
    fetch(`${process.env.REACT_APP_BASE_URL}/news/?page=${page}&limit=6`)
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            title: row.title,
            created_by: row.created_by,
            created_at: moment(row.created_at).format("L"),
            cover_img: row.cover_img,
            expires_at: moment(row.expires_at).format("L"),
            customer_type: row.customer_type,
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
  //
  // Delete
  function handlerBtnDlt(id) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/news/?id=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          openNotification("success");
          fetch(`${process.env.REACT_APP_BASE_URL}/news/?page=1&limit=6`)
            .then((response) => response.json())
            .then((result) => {
              setData(
                result.data.map((row, i) => ({
                  title: row.title,
                  created_by: row.created_by,
                  created_at: moment(row.created_at).format("L"),
                  cover_img: row.cover_img,
                  expires_at: moment(row.expires_at).format("L"),
                  customer_type: row.customer_type,
                  type: row.type,
                  id: row.id,
                  body: row.body,
                  key: i,
                }))
              );
              setPage(result);
            })
            .catch((error) => console.log("error", error));
        } else {
          openNotification("error");
        }
      })
      .catch((error) => console.log("error", error));
  }
  //
  const columns = [
    {
      title: "Гарчиг",
      dataIndex: "title",
      key: "title",
      width: "60%",
      render: (text, record) =>
        record.type === "bonus" ? (
          <a
            href="/#"
            className="TitleLinkto"
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_PUSH_URL}/bonus/${record.id}`)
            }
          >
            {record.title}
          </a>
        ) : (
          <a
            href="/#"
            className="TitleLinkto"
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_PUSH_URL}/news/${record.id}`)
            }
          >
            {record.title}
          </a>
        ),

      onFilter: (text, record) => {
        return record.title.toLowerCase().includes(text.toLowerCase());
      },
    },

    {
      title: "Н / Огноо",
      dataIndex: "created_at",
      key: "key",
    },
    {
      title: " Д / Огноо",
      dataIndex: "expires_at",
      key: "key",
    },
    {
      title: "Төрөл",
      dataIndex: "type",
      key: "key",
      render: (text, row) => (
        <span style={{ color: "#1890ff" }}>
          {row["type"] === "news" ? (
            "Мэдээ"
          ) : (
            <li style={{ color: "#ff9d5c" }}>Бонус</li>
          )}
        </span>
      ),
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
            <Button
              type="primary"
              style={{ width: "20%" }}
              onClick={handleBtnCreate}
            >
              Мэдээ нэмэх
            </Button>
            <Input
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  const filteredData = data.filter((entry) =>
                    entry.title.toLowerCase().includes(e.target.value)
                  );
                  setData(filteredData);
                } else {
                  console.log(e.target.value.length);
                  window.location.reload(false);
                }
              }}
              placeholder="Нэрээ оруулна уу"
              className="news_search"
              suffix={<SearchOutlined />}
            />
          </div>
          <Table
            style={{ height: "450px" }}
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
