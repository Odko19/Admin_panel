import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { notification } from "antd";
import "../styles/news.css";

function Product() {
  const [data, setData] = useState();
  const [page, setPage] = useState();

  //notif
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
    fetch(`${process.env.REACT_APP_BASE_URL}/product/?page=1&limit=6`)
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

  //

  // Edit
  let navigate = useNavigate();
  function handleBtnEdit(record) {
    console.log(record.product_id);
    navigate(`/product/${record.product_id}`);
    // setSelect(record);
  }

  //

  // Create

  function handleBtnCreate() {
    navigate("/product/create");
  }
  //

  // Pagination

  function handlePageChange(page) {
    fetch(`${process.env.REACT_APP_BASE_URL}/product/?page=${page}&limit=6`)
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
  }
  //

  // Delete btn
  function handlerBtnDlt(id) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/product/?id=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          openNotification("success");
          fetch(`${process.env.REACT_APP_BASE_URL}/product/?page=1&limit=6`)
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
        } else {
          openNotification("error");
        }
      })
      .catch((error) => console.log("error", error));
  }

  // Table
  const columns = [
    {
      title: "Нэр",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Үнэ",
      dataIndex: "product_price",
      key: "product_price",
    },
    {
      title: "Төрөл",
      dataIndex: "product_type",
      key: "product_type",
    },

    {
      title: "Засах",
      key: "edit",
      dataIndex: "key",
      render: (text, record) => (
        <button className="btnEdit" onClick={() => handleBtnEdit(record)}>
          <EditOutlined />
        </button>
      ),
    },
    {
      title: "Устгах",
      key: "delete",
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
      <div>
        <div className="news_content">
          <Button
            type="primary"
            style={{ width: "20%" }}
            onClick={handleBtnCreate}
          >
            Төхөөрөмж нэмэх
          </Button>
          <Input
            onChange={(e) => {
              if (e.target.value.length > 0) {
                const filteredData = data.filter((entry) =>
                  entry.product_name.toLowerCase().includes(e.target.value)
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
          style={{ marginTop: "20px" }}
          columns={columns}
          dataSource={data}
          // pagination={{
          //   position: ["bottomCenter"],
          //   pageSize: page?.currentPageSize,
          //   current: page?.currentPage,
          //   total: page?.totalDatas,
          //   onChange: (page) => handlePageChange(page),
          // }}
        />
      </div>
    </div>
  );
}

export default Product;
