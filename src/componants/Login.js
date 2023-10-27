import React from "react";
import { Input, Button, notification } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import "../styles/login.css";
import { LoginOutlined } from "@ant-design/icons";

function handleLogin(e) {
  //
  const openNotification = (type) => {
    if (type === "success") {
      notification[type]({
        message: "Амжилттай нэвтэрлээ",
        duration: 3,
      });
    } else {
      notification[type]({
        message: "Таны нууц үг эсвэл нэр буруу байна.",
        duration: 3,
      });
    }
  };
  //
  e.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    firstName: e.target.firstName.value,
    password: e.target.passWord.value,
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch(`${process.env.REACT_APP_BASE_URL}/login`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.success === false) {
        openNotification("error");
      } else {
        window.localStorage.setItem("user", JSON.stringify(result.data));
        window.location.href = "/";
        openNotification("success");
      }
    })
    .catch((error) => console.log("error", error));
}
var hours = 1; // to clear the localStorage after 1 hour
// (if someone want to clear after 8hrs simply change hours=8)
var now = new Date().getTime();
var setupTime = localStorage.getItem("setupTime");
if (setupTime == null) {
  localStorage.setItem("setupTime", now);
} else {
  if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.clear();
    localStorage.setItem("setupTime", now);
  }
}

function Login() {
  return (
    <div
      className="login"
      style={{
        height: "100vh",
        backgroundImage: `url(backgroundlogin.png)`,
        backgroundSize: "cover",
      }}
    >
      <form className="form" onSubmit={handleLogin}>
        <Input
          style={{ height: 38 }}
          placeholder="Нэр"
          name="firstName"
          suffix={<UserOutlined />}
        />
        <br />
        <Input.Password
          style={{ height: 38 }}
          placeholder="Нууц үг"
          name="passWord"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <br />
        <Button className="btnLogin" type="primary" htmlType="submit">
          <LoginOutlined />
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
