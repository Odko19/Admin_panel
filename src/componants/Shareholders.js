import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Table, notification } from "antd";
import moment from "moment";
import EditorUpdate from "./Editor/EditorUpdate";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../styles/news.css";

function Shareholders() {
  const [data, setData] = useState();
  const [select, setSelect] = useState();
  const [page, setPage] = useState();
  // Notification
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
  // Get
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/shareholders/?page=1&limit=6`)
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            title: row.title,
            created_by: row.created_by,
            created_at: moment(row.created_at).format("L"),
            cover_img: row.cover_img,
            id: row.id,
            body: row.body,
            key: i,
          }))
        );
        setPage(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  //

  // Edit
  let navigate = useNavigate();
  function handleBtnEdit(record) {
    setSelect(record);
  }
  //

  // Create
  function handleBtnCreate() {
    navigate("/editor", {
      state: "shareholders",
    });
  }
  //

  // Delete
  function handlerBtnDlt(id) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_BASE_URL}/shareholders/?id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          openNotification("success");
          fetch(
            `${process.env.REACT_APP_BASE_URL}/shareholders/?page=1&limit=6`
          )
            .then((response) => response.json())
            .then((result) => {
              setData(
                result.data.map((row, i) => ({
                  title: row.title,
                  created_by: row.created_by,
                  created_at: moment(row.created_at).format("L"),
                  cover_img: row.cover_img,
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

  // Pagination
  function handlePageChange(page) {
    fetch(
      `${process.env.REACT_APP_BASE_URL}/shareholders/?page=${page}&limit=6`
    )
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            title: row.title,
            created_by: row.created_by,
            created_at: moment(row.created_at).format("L"),
            cover_img: row.cover_img,
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

  const columns = [
    {
      title: "Гарчиг",
      dataIndex: "title",
      key: "key",
      render: (text, record) => (
        <a
          href="/shareholders#"
          className="TitleLinkto"
          onClick={() =>
            (window.location.href = `${process.env.REACT_APP_PUSH_URL}/shareholders/holders/news/${record.id}`)
          }
        >
          {record.title}
        </a>
      ),
    },
    {
      title: "Огноо",
      dataIndex: "created_at",
      key: "key",
      width: "15%",
    },
    {
      title: "Засах",
      key: "key",
      dataIndex: "key",
      width: "15%",
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
      width: "15%",
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
        <EditorUpdate data={select} type={"shareholders"} className="width" />
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
            //   total: page?.totalDatas,
            //   onChange: (page) => handlePageChange(page),
            // }}
          />
        </div>
      )}
    </div>
  );
}

export default Shareholders;
