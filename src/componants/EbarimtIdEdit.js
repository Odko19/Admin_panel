import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";

export default function EbarimtIdEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [data, setData] = useState();
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    fetch(`${process.env.REACT_APP_BASE_URL}/ebarimt/id?id=${id}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => console.log("error", error));
  }, [id]);

  const onFinish = (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      STAFF_ID: user.firstName,
      CUST_ID: values.CUST_ID,
      MOBILE: values.MOBILE,
      EBARIMT_ID: values.EBARIMT_ID,
      REGNO: values.REGNO,
      ID: id,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/ebarimt/edit`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          navigate("/ebarimt");
        }
      })
      .catch((error) => console.log("error", error));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 24,
        }}
        fields={[
          {
            name: ["CUST_ID"],
            value: data?.CUST_ID,
          },
          {
            name: ["CUST_NAME"],
            value: data?.CUST_NAME,
          },
          {
            name: ["REGNO"],
            value: data?.REGNO,
          },
          {
            name: ["EBARIMT_ID"],
            value: data?.EBARIMT_ID,
          },
          {
            name: ["MOBILE"],
            value: data?.MOBILE,
          },
        ]}
      >
        <Form.Item label="CUST_ID" name="CUST_ID">
          <Input />
        </Form.Item>
        <Form.Item label="CUST_NAME" name="CUST_NAME">
          <Input disabled />
        </Form.Item>
        <Form.Item label="REGNO" name="REGNO">
          <Input />
        </Form.Item>
        <Form.Item label="EBARIMT_ID" name="EBARIMT_ID">
          <Input />
        </Form.Item>
        <Form.Item label="MOBILE" name="MOBILE">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" style={{ width: "100%" }} htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
