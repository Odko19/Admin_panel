import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Input, Space, DatePicker } from "antd";
import moment from "moment";
import "../styles/ordercss.css";

function Payment() {
  const [data, setData] = useState();
  const [page, setPage] = useState();
  const [dates, setDates] = useState();
  const { Search } = Input;
  const { RangePicker } = DatePicker;
  const [url, setUrl] = useState();

  // Search

  const onSearch = (value, page, limit) => {
    page = 1;
    limit = 7;
    let url = `${process.env.REACT_APP_BASE_URL}/payment`;
    const queryParams = [];

    if (value) {
      queryParams.push(`invoice=${value}`);
    }
    if (dates && dates.length === 2) {
      queryParams.push(`begin=${dates[0]}`, `end=${dates[1]}`);
    }

    if (page && limit) {
      queryParams.push(`page=${page}`, `limit=${limit}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }
    setUrl(queryParams);
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data?.map((row, i) => ({
            INVOICE_DESC: row.INVOICE_DESC,
            PAYMENT_WALLET: row.PAYMENT_WALLET,
            TRANS_ID: row.TRANS_ID,
            AMOUNT: row.AMOUNT,
            EMAIL: row.EMAIL,
            ACCOUNT_NUMBER: row.ACCOUNT_NUMBER,
            CREATED_DATE: moment(row.CREATED_DATE).format("YYYY/MM/DD"),
            PAYMENT_STATUS: row.PAYMENT_STATUS,
            EBARIMT_STATUS: row.EBARIMT_STATUS,
            SETTLEMENTS_STATUS: row.SETTLEMENTS_STATUS,
            LINKEG_ID: row.LINKEG_ID,
            STATUS: row.STATUS,
            CARD_TYPE: row.CARD_TYPE,
            ID: row.ID,
            ACCOUNT_BANK_NAME: row.ACCOUNT_BANK_NAME,
            PAYMENT_TYPE: row.PAYMENT_TYPE,
            PAYMENT_CURRENCY: row.PAYMENT_CURRENCY,
            key: i,
          }))
        );
        setPage(result);
      })
      .catch((error) => console.log("error", error));
  };
  //
  //Modal Onclick
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modaldata, setModaldata] = useState([]);

  const showModal = (record) => {
    setModaldata(record);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //
  // GET REQUEST

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/payment?page=1&limit=7`)
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            INVOICE_DESC: row.INVOICE_DESC,
            PAYMENT_WALLET: row.PAYMENT_WALLET,
            TRANS_ID: row.TRANS_ID,
            AMOUNT: row.AMOUNT,
            EMAIL: row.EMAIL,
            ACCOUNT_NUMBER: row.ACCOUNT_NUMBER,
            CREATED_DATE: moment(row.CREATED_DATE).format("YYYY/MM/DD"),
            PAYMENT_STATUS: row.PAYMENT_STATUS,
            EBARIMT_STATUS: row.EBARIMT_STATUS,
            SETTLEMENTS_STATUS: row.SETTLEMENTS_STATUS,
            LINKEG_ID: row.LINKEG_ID,
            STATUS: row.STATUS,
            CARD_TYPE: row.CARD_TYPE,
            ID: row.ID,
            ACCOUNT_BANK_NAME: row.ACCOUNT_BANK_NAME,
            PAYMENT_TYPE: row.PAYMENT_TYPE,
            PAYMENT_CURRENCY: row.PAYMENT_CURRENCY,
            key: i,
          }))
        );
        setPage(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  //
  //Pagination
  function handlePageChange(page) {
    if (url) {
      const jsonObject = {};
      for (const item of url) {
        const [key, value] = item.split("=");
        jsonObject[key] = value;
      }

      jsonObject.page = page;
      const queryString = Object.entries(jsonObject)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      fetch(`${process.env.REACT_APP_BASE_URL}/payment?${queryString}`)
        .then((response) => response.json())
        .then((result) => {
          setData(
            result.data?.map((row, i) => ({
              INVOICE_DESC: row.INVOICE_DESC,
              PAYMENT_WALLET: row.PAYMENT_WALLET,
              TRANS_ID: row.TRANS_ID,
              AMOUNT: row.AMOUNT,
              EMAIL: row.EMAIL,
              ACCOUNT_NUMBER: row.ACCOUNT_NUMBER,
              CREATED_DATE: moment(row.CREATED_DATE).format("YYYY/MM/DD"),
              PAYMENT_STATUS: row.PAYMENT_STATUS,
              EBARIMT_STATUS: row.EBARIMT_STATUS,
              SETTLEMENTS_STATUS: row.SETTLEMENTS_STATUS,
              LINKEG_ID: row.LINKEG_ID,
              STATUS: row.STATUS,
              CARD_TYPE: row.CARD_TYPE,
              ID: row.ID,
              ACCOUNT_BANK_NAME: row.ACCOUNT_BANK_NAME,
              PAYMENT_TYPE: row.PAYMENT_TYPE,
              PAYMENT_CURRENCY: row.PAYMENT_CURRENCY,
              key: i,
            }))
          );
          setPage(result);
        })
        .catch((error) => console.log("error", error));
    } else {
      fetch(`${process.env.REACT_APP_BASE_URL}/payment?page=${page}&limit=6`)
        .then((response) => response.json())
        .then((result) => {
          setData(
            result.data.map((row, i) => ({
              INVOICE_DESC: row.INVOICE_DESC,
              PAYMENT_WALLET: row.PAYMENT_WALLET,
              TRANS_ID: row.TRANS_ID,
              AMOUNT: row.AMOUNT,
              EMAIL: row.EMAIL,
              ACCOUNT_NUMBER: row.ACCOUNT_NUMBER,
              CREATED_DATE: moment(row.CREATED_DATE).format("YYYY/MM/DD"),
              PAYMENT_STATUS: row.PAYMENT_STATUS,
              EBARIMT_STATUS: row.EBARIMT_STATUS,
              SETTLEMENTS_STATUS: row.SETTLEMENTS_STATUS,
              LINKEG_ID: row.LINKEG_ID,
              STATUS: row.STATUS,
              CARD_TYPE: row.CARD_TYPE,
              ID: row.ID,
              ACCOUNT_BANK_NAME: row.ACCOUNT_BANK_NAME,
              PAYMENT_TYPE: row.PAYMENT_TYPE,
              PAYMENT_CURRENCY: row.PAYMENT_CURRENCY,
              key: i,
            }))
          );
          setPage(result);
        })
        .catch((error) => console.log("error", error));
    }
  }
  //

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Гүйлгээний утга",
      dataIndex: "INVOICE_DESC",
      key: "INVOICE_DESC",
    },
    {
      title: "Дүн",
      dataIndex: "AMOUNT",
      key: "AMOUNT",
    },
    {
      title: "Payment Wallet",
      dataIndex: "PAYMENT_WALLET",
      key: "PAYMENT_WALLET",
    },

    {
      title: "CARD_TYPE",
      dataIndex: "CARD_TYPE",
      key: "product_price",
    },
    {
      title: "P/status",
      dataIndex: "STATUS",
      key: "STATUS",
      render: (text, row) => (
        <span style={{ color: "#4C9a2a" }}>
          {row["STATUS"] === "S" ? (
            "Paid"
          ) : (
            <li style={{ color: "#f01e2c" }}>Unpaid</li>
          )}
        </span>
      ),
    },

    {
      title: "Огноо",
      dataIndex: "CREATED_DATE",
      key: "product_type",
    },
    {
      title: "Дэлгэрэнгүй",
      dataIndex: "",
      key: "product_type",
      render: (record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Харах
        </Button>
      ),
    },
  ];
  return (
    <div>
      <Modal
        title="Дэлгэрэнгүй мэдээлэл"
        style={{ top: 20 }}
        open={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <div className="pt">
          <div className="p1">
            <div style={{ width: "160px" }}>Гүйлгээний утга : </div>
            {modaldata.INVOICE_DESC}
          </div>
          <div className="p2">
            <div style={{ width: "160px" }}>Үнийн дүн: </div>
            {modaldata.AMOUNT}
          </div>
          <div className="p1">
            <div style={{ width: "160px" }}>Банк : </div>
            {modaldata.PAYMENT_WALLET}
          </div>
          <div className="p2">
            <div style={{ width: "160px" }}> Валют : </div>
            {modaldata.PAYMENT_CURRENCY}
          </div>
          <div className="p1">
            <div style={{ width: "160px" }}>Данс : </div>
            {modaldata.ACCOUNT_NUMBER}
          </div>
          <div className="p2">
            <div style={{ width: "160px" }}>Статус : </div>
            {modaldata.STATUS}
          </div>
          <div className="p1">
            <div style={{ width: "160px" }}>LINKEG_ID : </div>
            {modaldata.LINKEG_ID}
          </div>
          <div className="p2">
            <div style={{ width: "160px" }}>И-Баримт Статус : </div>
            {modaldata.EBARIMT_STATUS}
          </div>
          <div className="p1">
            <div style={{ width: "160px" }}>Картны төрөл : </div>
            {modaldata.CARD_TYPE}
          </div>
          <div className="p2">
            <div style={{ width: "160px" }}>Гүйлгээний төрөл : </div>
            {modaldata.PAYMENT_TYPE}
          </div>
          <div className="p1">
            <div style={{ width: "160px" }}>Email : </div>
            {modaldata.EMAIL}
          </div>
        </div>
      </Modal>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <Space direction="vertical" size={12}>
          <RangePicker
            style={{ width: "95%" }}
            onChange={(values) => {
              setDates(
                values &&
                  values.map((item) => moment(item.$d).format("YYYY/MM/DD"))
              );
            }}
          />
        </Space>
        <Search
          style={{ width: "100%" }}
          placeholder="Гүйлгээний утгаар хайна уу"
          onSearch={onSearch}
        />
      </div>
      <Table
        style={{ height: "450px" }}
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["bottomCenter"],
          pageSize: page?.currentPageSize,
          current: page?.currentPage,
          total: page?.totalPages,
          showSizeChanger: true,
          onChange: (page) => handlePageChange(page),
        }}
      />
    </div>
  );
}

export default Payment;
