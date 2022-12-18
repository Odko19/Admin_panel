import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Table } from "antd";
import Editor from "./Product_editor/Product_editor";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { notification } from "antd";
import "../styles/news.css";

function Product() {
  const [data, setData] = useState();
  const [select, setSelect] = useState();
  const [page, setPage] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/v1/product/?page=1&limit=6")
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            product_id: row.product_id,
            product_img: row.product_img,
            product_name: row.product_name,
            product_performance: row.product_performance,
            product_price: row.product_price,
            product_type: row.product_type,
            created_by: row.created_by,
            created_at: row.created_at,
            updated_at: row.updated_at,
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
    navigate("/product/create");
  }

  function handlePageChange(page) {
    fetch(`http://localhost:3001/v1/product/?page=${page}&limit=6`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }

  function handlerBtnDlt(id) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`http://localhost:3001/v1/product/?id=${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            product_id: row.product_id,
            product_img: row.product_img,
            product_name: row.product_name,
            product_performance: row.product_performance,
            product_price: row.product_price,
            product_type: row.product_type,
            created_by: row.created_by,
            created_at: row.created_at,
            updated_at: row.updated_at,
            key: i,
          }))
        );
        setPage(result);
      })
      .catch((error) => console.log("error", error));
  }

  const columns = [
    {
      title: "Нэр",
      dataIndex: "product_name",
      key: "key",
    },
    {
      title: "Үнэ",
      dataIndex: "product_price",
      key: "key",
    },
    {
      title: "Төрөл",
      dataIndex: "product_type",
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
        <button
          className="btnDlt"
          onClick={() => handlerBtnDlt(record.product_id)}
        >
          <DeleteOutlined />
        </button>
      ),
    },
  ];

  return (
    <div className="news">
      {select ? (
        <Editor data={select} className="width" />
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

export default Product;
