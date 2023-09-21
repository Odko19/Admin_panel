import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Modal,
  Button,
  Pagination,
  Checkbox,
  Input,
  Space,
  DatePicker,
  Select,
} from "antd";
import "../styles/ordercss.css";
import moment from "moment";

function EbarimtId() {
  const [data, setData] = useState();
  const [page, setPage] = useState();
  const [user, setUser] = useState([]);
  const [modaldata, setModaldata] = useState([]);
  const [dates, setDates] = useState();
  const [choiceTwo, setChoiceTwo] = useState();
  const { Search } = Input;
  const { RangePicker } = DatePicker;
  //SWITCH
  const [checkValue, setCheckValue] = useState();
  const [checkState, setCheckState] = useState();
  const [url, setUrl] = useState();
  const navigate = useNavigate();

  const onChange = (e) => {
    setCheckValue(e.target.value);
    setCheckState(e.target.checked);
  };

  //LocalStroage user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  //

  const onSearch = (value, page, limit) => {
    page = 1;
    limit = 7;
    let url = `${process.env.REACT_APP_BASE_URL}/ebarimt`;
    const queryParams = [];

    if (value) {
      queryParams.push(`${choiceTwo}=${value}`);
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
          result.data.map((row, i) => ({
            ID: row.ID,
            CUST_ID: row.CUST_ID,
            REGNO: row.REGNO,
            EBARIMT_ID: row.EBARIMT_ID,
            CREATED_AT: moment(row.CREATED_AT).format("L"),
            UPDATED_AT: row.UPDATED_AT,
            ID_CHECK: row.ID_CHECK,
            STAFF_ID: row.STAFF_ID,
            MOBILE: row.MOBILE,
            key: i,
          }))
        );
        setPage(result);
      })
      .catch((error) => console.log("error", error));
  };

  // ONCLICK MODAL
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    setModaldata(record);
    setIsModalVisible(true);
  };
  const handleOk = (record) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      ID: record,
      STAFF_ID: user.firstName,
      ID_CHECK: 1,
    });
    console.log(raw);
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/ebarimt`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          window.location.reload();
        }
      })
      .catch((error) => console.log("error", error));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const regexPattern = /"([^"]+)"/g;

  // GET
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/ebarimt?page=1&limit=7`)
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            ID: row.ID,
            CUST_ID: row.CUST_ID,
            REGNO: row.REGNO,
            EBARIMT_ID: row.EBARIMT_ID,
            CREATED_AT: moment(row.CREATED_AT).format("L"),
            UPDATED_AT: row.UPDATED_AT,
            ID_CHECK: row.ID_CHECK,
            STAFF_ID: row.STAFF_ID,
            MOBILE: row.MOBILE,
            key: i,
          }))
        );
        console.log(result);
        setPage(result);
      })
      .catch((error) => console.log("error", error));
  }, [modaldata]);

  // Pagination
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

      fetch(`${process.env.REACT_APP_BASE_URL}/ebarimt?${queryString}`)
        .then((response) => response.json())
        .then((result) => {
          setData(
            result.data.map((row, i) => ({
              ID: row.ID,
              CUST_ID: row.CUST_ID,
              REGNO: row.REGNO,
              EBARIMT_ID: row.EBARIMT_ID,
              CREATED_AT: moment(row.CREATED_AT).format("L"),
              UPDATED_AT: row.UPDATED_AT,
              ID_CHECK: row.ID_CHECK,
              STAFF_ID: row.STAFF_ID,
              MOBILE: row.MOBILE,
              key: i,
            }))
          );
          setPage(result);
        })
        .catch((error) => console.log("error", error));
    } else {
      fetch(`${process.env.REACT_APP_BASE_URL}/ebarimt?page=${page}&limit=7`)
        .then((response) => response.json())
        .then((result) => {
          setData(
            result.data.map((row, i) => ({
              ID: row.ID,
              CUST_ID: row.CUST_ID,
              REGNO: row.REGNO,
              EBARIMT_ID: row.EBARIMT_ID,
              CREATED_AT: moment(row.CREATED_AT).format("L"),
              UPDATED_AT: row.UPDATED_AT,
              ID_CHECK: row.ID_CHECK,
              STAFF_ID: row.STAFF_ID,
              MOBILE: row.MOBILE,
              key: i,
            }))
          );
          setPage(result);
        })
        .catch((error) => console.log("error", error));
    }
  }

  const columns = [
    {
      title: "№",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Гэрээний дугаар",
      dataIndex: "CUST_ID",
      key: "CUST_ID",
    },
    {
      title: "Регистерийн дугаар",
      dataIndex: "REGNO",
      key: "REGNO",
    },
    {
      title: "Ибаримтын дугаар",
      dataIndex: "EBARIMT_ID",
      key: "EBARIMT_ID",
    },

    {
      title: "Огноо",
      dataIndex: "CREATED_AT",
      key: "CREATED_AT",
    },
    {
      title: "Утасны дугаар",
      dataIndex: "MOBILE",
      key: "MOBILE",
    },

    {
      title: "Баталгаажуулалт",
      width: "12%",
      dataIndex: "",
      key: "action",
      render: (record) => (
        <Button
          onClick={() => showModal(record)}
          type="primary"
          style={{ border: "none" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={
                record.ID_CHECK === 0
                  ? {
                      backgroundColor: "red",
                      width: "10px",
                      height: "10px",
                      marginRight: "10px",
                    }
                  : {
                      backgroundColor: "#00b96b",
                      width: "10px",
                      height: "10px",
                      marginRight: "10px",
                    }
              }
            ></div>
            <span> Баталгаажуулах</span>
          </div>
        </Button>
      ),
    },
  ];

  const handlerBtnTwo = (value) => {
    setChoiceTwo(value);
  };

  return (
    <div>
      <Modal
        title="Дэлгэрэнгүй мэдээлэл"
        style={{ top: 20 }}
        open={isModalVisible}
        onOk={() => handleOk(modaldata.ID)}
        onCancel={handleCancel}
        width={700}
      >
        <div className="pt">
          <div className="p1">
            <div style={{ width: "160px" }}>ID : </div>
            {modaldata.ID}
          </div>
          <div className="p2">
            <div style={{ width: "160px" }}>CREATED_AT : </div>
            {modaldata.CREATED_AT}
          </div>
          <div className="p1">
            <div style={{ width: "160px" }}>CUST_ID : </div>
            {modaldata.CUST_ID}
          </div>
          <div className="p2">
            <div style={{ width: "160px" }}>EBARIMT_ID : </div>
            {modaldata.EBARIMT_ID}
          </div>

          <div className="p1">
            <div style={{ width: "160px" }}>MOBILE: </div>
            {modaldata.MOBILE}
          </div>
          <div className="p2">
            <div style={{ width: "160px" }}>REGNO : </div>
            {modaldata.REGNO}
          </div>

          <p>
            <>
              {modaldata.ID_CHECK === 0 ? (
                <Checkbox
                  onChange={onChange}
                  checked={checkValue === modaldata.ID ? checkState : false}
                  value={modaldata.ID}
                >
                  {checkState === true && checkValue === modaldata.ID
                    ? "Баталгаажсан"
                    : "Баталгаажгүй"}
                </Checkbox>
              ) : (
                <Checkbox checked={true}>Баталгаажсан</Checkbox>
              )}
            </>
          </p>
        </div>
      </Modal>

      <div style={{ display: "flex", marginBottom: "20px" }}>
        <Space direction="vertical" size={12}>
          <RangePicker
            style={{ width: "95%" }}
            onChange={(values) => {
              setDates(
                values &&
                  values.map((item) => moment(item.$d).format("YYYY-MM-DD"))
              );
            }}
          />
        </Space>
        <Select
          style={{
            width: 230,
            margin: "0 5px 0 5px",
          }}
          placeholder="Хайлт төрөл"
          onChange={handlerBtnTwo}
          options={[
            {
              value: "ebarimt_id",
              label: "Ибаримт дугаар",
            },
            {
              value: "mobile",
              label: "Утасны дугаар",
            },
            {
              value: "regno",
              label: "Регистерийн дугаар",
            },
            {
              value: "cust_id",
              label: "Гэрээний дугаар",
            },
          ]}
        />
        <Search placeholder="Хайлт" onSearch={onSearch} />
      </div>
      <Table dataSource={data} columns={columns} pagination={false} />

      <Pagination
        pageSize={1}
        current={page?.currentPage}
        total={page?.totalPages}
        onChange={(page) => handlePageChange(page)}
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      />
    </div>
  );
}

export default EbarimtId;
