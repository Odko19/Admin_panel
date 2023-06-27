import React, { useState, useEffect } from "react";
import { Button, Tag, Table, Modal, notification, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "../styles/cover.css";

function FaceCover() {
  // Localstorage User set
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  //
  //Radio
  const [placement, SetPlacement] = useState();
  const placementChange = (e) => {
    return SetPlacement(e.target.value);
  };
  //
  // Notif
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
  const openNotifUpdate = (type) => {
    if (type === "error") {
      notification[type]({
        message: "error",
        duration: 3,
      });
    } else {
      notification[type]({
        message: "Updated",
        duration: 3,
      });
    }
  };
  //
  const handleUpload = (record) => {
    navigate("/cover/upload");
  };
  // Onclick Modal
  const showModal = (record) => {
    setModaldata(record);
    setIsModalVisible(true);
  };
  const [modaldata, setModaldata] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  //
  const [business, setBusiness] = useState();
  const [resident, setResident] = useState();

  let navigate = useNavigate();

  // Modal Click EDIT
  function onClickEdit(e) {
    console.log(modaldata);
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var formdata = new FormData();
    formdata.append("type", placement);
    formdata.append("image", e.target.images2.files[0]);
    formdata.append("created_by", user?.id);
    formdata.append("id", modaldata.id);

    var requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/coverimg`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          window.location.reload();
          openNotifUpdate("success");
        } else {
          openNotifUpdate("error");
        }
      })
      .catch((error) => console.log("error", error));
    setIsModalVisible(false);
  }
  //
  // Modal Cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //
  // Delete
  function handleDltRes(record) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_BASE_URL}/coverimg/?id=${record.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          openNotification("success");
          fetch(
            `${process.env.REACT_APP_BASE_URL}/coverimg/?type=${record.type}`
          )
            .then((response) => response.json())
            .then((result) => {
              if (record.type === "resident") {
                setResident(
                  result.data.map((item, i) => ({
                    image: item.image,
                    type: item.type,
                    id: item.id,
                    key: i,
                  }))
                );
              } else {
                setBusiness(
                  result.data.map((item, i) => ({
                    image: item.image,
                    type: item.type,
                    id: item.id,
                    key: i,
                  }))
                );
              }
            })
            .catch((error) => console.log("error", error));
        } else {
          openNotification("error");
        }
      })
      .catch((error) => console.log("error", error));
  }
  //

  //GET
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/coverimg/?type=business`)
      .then((response) => response.json())
      .then((result) => {
        setBusiness(
          result.data.map((item, i) => ({
            image: item.image,
            type: item.type,
            id: item.id,
            key: i,
          }))
        );
      })
      .catch((error) => console.log("error", error));
    fetch(`${process.env.REACT_APP_BASE_URL}/coverimg/?type=resident`)
      .then((response) => response.json())
      .then((result) => {
        setResident(
          result.data.map((item, i) => ({
            image: item.image,
            type: item.type,
            id: item.id,
            key: i,
          }))
        );
      })
      .catch((error) => console.log("error", error));
  }, []);
  //
  const columns = [
    {
      title: "Хувь хүн",
      dataIndex: "image",
      width: "60%",
      height: "20%",
      render: (record) => (
        <img
          className="coverimg"
          src={`${process.env.REACT_APP_BASE_URL}/uploads/${record}`}
          alt={`${process.env.REACT_APP_BASE_URL}/uploads/${record}`}
        />
      ),

      key: "item.id",
    },
    {
      title: "Засах",
      dataIndex: "type",
      key: "item.type",
      render: (text, record) => (
        <Button className="btnEdit" onClick={() => showModal(record)}>
          <EditOutlined />
        </Button>
      ),
    },
    {
      title: "Устгах",
      dataIndex: "type",
      key: "product_type",
      render: (text, record) => (
        <Button className="btnDlt" onClick={() => handleDltRes(record)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];
  const columns1 = [
    {
      title: "Байгууллага",
      dataIndex: "image",
      key: "product_name",
      width: "60%",
      height: "20%",
      render: (record) => (
        <img
          className="coverimg"
          src={`${process.env.REACT_APP_BASE_URL}/uploads/${record}`}
          alt={`${process.env.REACT_APP_BASE_URL}/uploads/${record}`}
        />
      ),
    },
    {
      title: "Засах",
      dataIndex: "type",
      key: "product_price",
      render: (text, record) => (
        <Button className="btnEdit" onClick={() => showModal(record)}>
          <EditOutlined />
        </Button>
      ),
    },
    {
      title: "Устгах",
      dataIndex: "type",
      key: "product_type",
      render: (text, record) => (
        <Button className="btnDlt" onClick={() => handleDltRes(record)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button
        onClick={() => handleUpload()}
        type="primary"
        style={{ width: "200px" }}
      >
        Зураг оруулах
      </Button>
      <Tag style={{ marginLeft: "20px" }} color="orange">
        Зургийн хэмжээ 1900px / 680px байна
      </Tag>
      <div>
        <Table
          columns={columns}
          dataSource={resident}
          pagination={false}
          style={{ marginTop: "20px" }}
        />
        <Table
          columns={columns1}
          dataSource={business}
          pagination={false}
          style={{ marginTop: "20px" }}
        />
      </div>
      <Modal
        destroyOnClose={true}
        title="Зураг солих"
        style={{ top: 20 }}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <form onSubmit={onClickEdit}>
          <div className="coverRadio">
            <Radio.Group
              value={modaldata?.type}
              onChange={placementChange}
              style={{ width: "50%" }}
            >
              <Radio.Button value="resident" style={{ width: "50%" }}>
                Хувь хүн
              </Radio.Button>
              <Radio.Button value="business" style={{ width: "50%" }}>
                Байгууллага
              </Radio.Button>
            </Radio.Group>
          </div>
          <section className="coverSection">
            <label className="coverLabel">
              + Add Images
              <br />
              <span className="coverSpan">Зурагаа оруулна уу</span>
              <br />
              <input
                type="file"
                name="images2"
                accept="image/png , image/jpeg, image/webp"
              />
            </label>
            <br />
            <button type="submit" className="coverBtnSave">
              Save
            </button>
          </section>
        </form>
      </Modal>
    </div>
  );
}
export default FaceCover;
