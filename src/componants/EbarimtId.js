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
  notification,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
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
        console.log(result);
        setData(
          result.data.map((row, i) => ({
            ID: row.ID,
            CUST_ID: row.CUST_ID,
            CUST_NAME: row.CUST_NAME,
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

  // GET
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/ebarimt?page=1&limit=7`)
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            ID: row.ID,
            CUST_ID: row.CUST_ID,
            CUST_NAME: row.CUST_NAME,
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
              CUST_NAME: row.CUST_NAME,
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
              CUST_NAME: row.CUST_NAME,
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
      title: "Гэрээ дугаар",
      dataIndex: "CUST_ID",
      key: "CUST_ID",
    },
    {
      title: "Гэрээ нэр",
      dataIndex: "CUST_NAME",
      key: "CUST_NAME",
    },
    {
      title: "Регистер дугаар",
      dataIndex: "REGNO",
      key: "REGNO",
    },
    {
      title: "Ибаримт дугаар",
      dataIndex: "EBARIMT_ID",
      key: "EBARIMT_ID",
    },

    {
      title: "Огноо",
      dataIndex: "CREATED_AT",
      key: "CREATED_AT",
    },
    {
      title: "Утас дугаар",
      dataIndex: "MOBILE",
      key: "MOBILE",
    },
    {
      title: "Баталгаажуулах",
      width: "12%",
      dataIndex: "",
      key: "action",
      render: (record) => (
        <Button
          onClick={() => showModal(record)}
          style={
            record.ID_CHECK === 0
              ? {
                  backgroundColor: "red",
                  color: "white",
                }
              : {
                  backgroundColor: "#00b96b",
                  color: "white",
                }
          }
        >
          <div>
            <span> Баталгаажуулах</span>
          </div>
        </Button>
      ),
    },

    {
      title: "Засах",
      width: "12%",
      dataIndex: "",
      key: "action",
      render: (record) => (
        <Button
          onClick={() =>
            navigate({
              pathname: "/ebarimt/edit",
              search: `id=${record.ID}`,
            })
          }
          type="primary"
          style={{ border: "none" }}
        >
          <EditOutlined />
        </Button>
      ),
    },
  ];

  const handlerBtnTwo = (value) => {
    setChoiceTwo(value);
  };

  // ADD button

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState();

  const onChangeAdd = (values) => {
    setValue(values.target.value);
  };
  const showModalAdd = () => {
    setIsModalOpen(true);
  };

  const openNotification = (type) => {
    if (type === "error") {
      notification[type]({
        message: "error",
        duration: 3,
      });
    } else {
      notification[type]({
        message: "Мэдээлэл амжилттай нэмэгдсэн",
        duration: 3,
      });
    }
  };

  const handleOkAdd = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      CUSTID: value,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/ebarimt`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          openNotification("success");
          setIsModalOpen(false);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const handleCancelAdd = () => {
    setIsModalOpen(false);
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
        <Button
          onClick={showModalAdd}
          type="primary"
          style={{ marginRight: "8px" }}
        >
          Нэмэх
        </Button>
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
        <Search
          placeholder="Хайлт"
          onSearch={onSearch}
          style={{ marginLeft: "8px" }}
        />
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
      <Modal
        title="Нэмэх"
        open={isModalOpen}
        onOk={handleOkAdd}
        onCancel={handleCancelAdd}
      >
        <Input
          placeholder="Гэрээний дугаараа оруулана уу"
          onChange={onChangeAdd}
        />
      </Modal>
    </div>
  );
}

export default EbarimtId;
