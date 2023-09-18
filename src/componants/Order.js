import React, { useEffect, useState } from "react";
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

function Order() {
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
    let url = `${process.env.REACT_APP_BASE_URL}/order`;
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
            FIRST_NAME: row.FIRST_NAME,
            LAST_NAME: row.LAST_NAME,
            CUST_TYPE: row.CUST_TYPE,
            MOBILE: row.MOBILE,
            EMAIL: row.EMAIL,
            CITY: row.CITY,
            DISTRICT: row.DISTRICT,
            KHOROO: row.KHOROO,
            APARTMENT: row.APARTMENT,
            DOOR: row.DOOR,
            ENTRANCE: row.ENTRANCE,
            REGISTER: row.REGISTER,
            RESULT: row.RESULT,
            SERVICE: row.SERVICE,
            ID: row.ID,
            OPERATOR_ID: row.OPERATOR_ID,
            OPERATOR_STATUS: row.OPERATOR_STATUS,
            ADDITIONAL: row.ADDITIONAL,
            CREATED_AT: moment(row.CREATED_AT).format("L"),
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
      OPERATOR_ID: user.id,
      OPERATOR_STATUS: 1,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/order`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //
  //

  const regexPattern = /"([^"]+)"/g;

  // GET
  useEffect(() => {
    if (user?.location !== undefined) {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/order?page=1&limit=7&location=${user?.location}`
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setData(
            result.data.map((row, i) => ({
              FIRST_NAME: row.FIRST_NAME,
              LAST_NAME: row.LAST_NAME,
              MOBILE: row.MOBILE,
              EMAIL: row.EMAIL,
              CITY: row.CITY,
              DISTRICT: row.DISTRICT,
              KHOROO: row.KHOROO,
              APARTMENT: row.APARTMENT,
              DOOR: row.DOOR,
              ENTRACE: row.ENTRACE,
              REGISTER: row.REGISTER,
              RESULT: row.RESULT,
              SERVICE: row.SERVICE,
              OPERATOR_ID: row.OPERATOR_ID,
              OPERATOR_STATUS: row.OPERATOR_STATUS,
              CUST_NAME: row.CUST_NAME,
              CUST_TYPE: row.CUST_TYPE,
              ADDITIONAL: row.ADDITIONAL,
              CREATED_AT: moment(row.CREATED_AT).format("L"),
              key: i,
            }))
          );
          setPage(result);
        })
        .catch((error) => console.log("error", error));
    }
  }, [modaldata, user]);

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

      fetch(`${process.env.REACT_APP_BASE_URL}/order?${queryString}`)
        .then((response) => response.json())
        .then((result) => {
          setData(
            result.data.map((row, i) => ({
              FIRST_NAME: row.FIRST_NAME,
              LAST_NAME: row.LAST_NAME,
              CUST_TYPE: row.CUST_TYPE,
              MOBILE: row.MOBILE,
              EMAIL: row.EMAIL,
              CITY: row.CITY,
              DISTRICT: row.DISTRICT,
              KHOROO: row.KHOROO,
              APARTMENT: row.APARTMENT,
              DOOR: row.DOOR,
              ENTRACE: row.ENTRACE,
              REGISTER: row.REGISTER,
              RESULT: row.RESULT,
              SERVICE: row.SERVICE,
              ID: row.ID,
              OPERATOR_ID: row.OPERATOR_ID,
              OPERATOR_STATUS: row.OPERATOR_STATUS,
              ADDITIONAL: row.ADDITIONAL,
              CREATED_AT: moment(row.CREATED_AT).format("L"),
              key: i,
            }))
          );
          setPage(result);
        })
        .catch((error) => console.log("error", error));
    } else {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/order?page=${page}&limit=7&location=${user?.location}`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(
            result.data.map((row, i) => ({
              FIRST_NAME: row.FIRST_NAME,
              LAST_NAME: row.LAST_NAME,
              CUST_TYPE: row.CUST_TYPE,
              MOBILE: row.MOBILE,
              EMAIL: row.EMAIL,
              CITY: row.CITY,
              DISTRICT: row.DISTRICT,
              KHOROO: row.KHOROO,
              APARTMENT: row.APARTMENT,
              DOOR: row.DOOR,
              ENTRACE: row.ENTRACE,
              REGISTER: row.REGISTER,
              RESULT: row.RESULT,
              SERVICE: row.SERVICE,
              ID: row.ID,
              OPERATOR_ID: row.OPERATOR_ID,
              OPERATOR_STATUS: row.OPERATOR_STATUS,
              ADDITIONAL: row.ADDITIONAL,
              CREATED_AT: moment(row.CREATED_AT).format("L"),
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
      title: "Овог",
      width: "16%",
      dataIndex: "LAST_NAME",
      key: "LAST_NAME",
    },
    {
      title: "Нэр",
      width: "16%",
      dataIndex: "FIRST_NAME",
      key: "FIRST_NAME",
    },
    {
      title: "Утас",
      width: "9%",
      dataIndex: "MOBILE",
      key: "MOBILE",
    },
    {
      title: "РД",
      width: "11%",
      dataIndex: "REGISTER",
      key: "REGISTER",
    },
    {
      title: "Хаяг",
      width: "15%",
      dataIndex: ["CITY", "DISTRICT"],
      key: "address",
      render: (text, row) => (
        <span style={{ color: "black" }}>
          {row["CITY"]} {row["DISTRICT"]}
          {/* {row["KHOROO"]} {row["APARTMENT"]} {row["ENTRANCE" ]} орц {row["DOOR"]} тоот */}
        </span>
      ),
    },
    {
      title: "Огноо",
      width: "12%",
      dataIndex: "CREATED_AT",
      key: "address",
    },
    {
      title: "Үзсэн",
      width: "13%",
      dataIndex: "OPERATOR_STATUS",
      key: "OPERATOR_STATUS",
      render: (text, row) => (
        <span style={{ color: "#1890ff" }}>
          {row["OPERATOR_STATUS"] === 1 ? (
            "Шивэгдсэн"
          ) : (
            <li style={{ color: "#ff675f" }}>Шивэгдээгүй</li>
          )}
        </span>
      ),
    },
    {
      title: "Дэлгэрэнгүй",
      width: "12%",
      dataIndex: "",
      key: "action",
      render: (record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Харах
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
            <div style={{ width: "160px" }}>Овог : </div>
            {modaldata.LAST_NAME}
          </div>
          <div className="p2">
            <div style={{ width: "160px" }}>Нэр : </div>
            {modaldata.FIRST_NAME}
          </div>
          <div className="p1">
            <div style={{ width: "160px" }}>Утас : </div>
            {modaldata.MOBILE}
          </div>
          <div className="p2">
            <div style={{ width: "160px" }}>Регистр : </div>
            {modaldata.REGISTER}
          </div>

          <div className="p1">
            <div style={{ width: "160px" }}>Төрөл</div>
            {modaldata.CUST_TYPE === "PSN"
              ? "Хувь хүн"
              : modaldata.CUST_TYPE === "GOV"
              ? "Байгууллага"
              : "Бизнес"}
          </div>
          {modaldata.CUST_TYPE === "GOV" ? (
            <div className="p2">
              <div style={{ width: "160px" }}>Байгууллагын нэр : </div>
              {modaldata.CUST_NAME}
            </div>
          ) : (
            ""
          )}
          <div className="p1">
            <div style={{ width: "160px" }}>Хот/Аймаг: </div>
            {modaldata.CITY}
          </div>
          <div className="p2">
            <div style={{ width: "160px" }}>Дүүрэг / Сум : </div>
            {modaldata.DISTRICT}
          </div>
          <div className="p1">
            <div style={{ width: "160px" }}>Хороо : </div>
            {modaldata.KHOROO}
          </div>
          <div className="p2">
            <div style={{ width: "160px" }}>Байр : </div>
            {modaldata.APARTMENT}
          </div>
          <div className="p1">
            <div style={{ width: "160px" }}>Орц : </div>
            {modaldata.ENTRACE}
          </div>
          <div className="p2">
            <div style={{ width: "160px" }}>Тоот : </div>
            {modaldata.DOOR}
          </div>

          <div className="p1">
            <div style={{ width: "160px" }}>Үйлчилгээ</div>
            {modaldata.SERVICE}
          </div>
          <div className="p2">
            <div style={{ width: "160px" }}>Email : </div>
            {modaldata.EMAIL}
          </div>
          <div style={{ height: "65px" }} className="p1">
            Нэмэлт тайлбар: {modaldata.ADDITIONAL}
          </div>
          <p>
            <>
              {modaldata.OPERATOR_STATUS === null ? (
                <Checkbox
                  onChange={onChange}
                  checked={checkValue === modaldata.ID ? checkState : false}
                  value={modaldata.ID}
                >
                  {checkState === true && checkValue === modaldata.ID
                    ? "Шивэгдсэн"
                    : "Шивэгдээгүй"}
                </Checkbox>
              ) : (
                <Checkbox checked={true}>Шивэгдсэн</Checkbox>
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
        {/* <Input
                        onChange={e => {
                          if(e.target.value.length > 0 ){
                            const filteredData = data.filter(entry =>
                              entry.MOBILE.toLowerCase().includes(e.target.value)
                            );
                            setData(filteredData);
                          
                          } else {
                            console.log(e.target.value.length)
                            window.location.reload(false);
                          }                    
                                      }}
              placeholder=" Утасны дугаараар хайна уу"
              style={{marginBottom: "20px"}}
              suffix={<SearchOutlined />}
            /> */}

        <Select
          style={{
            width: 200,
            margin: "0 5px 0 5px",
          }}
          placeholder="Хайлт төрөл"
          onChange={handlerBtnTwo}
          options={[
            {
              value: "mobile",
              label: "Утасны дугаар",
            },
            {
              value: "register",
              label: "Регистерийн дугаар",
            },
            {
              value: "city",
              label: "Хаяг",
            },
          ]}
        />
        <Search placeholder="Утасны дугаарыг оруулна уу" onSearch={onSearch} />
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

export default Order;
