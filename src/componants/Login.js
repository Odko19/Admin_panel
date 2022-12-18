import React from "react";
import { Input, Button } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import "../styles/login.css";

function handleLogin(e) {
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
  fetch("http://localhost:3001/v1/login", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.success === false) {
        alert("Нууц үг буруу байна");
      } else {
        window.localStorage.setItem("user", JSON.stringify(result.data));
        window.location.reload();
      }
    })
    .catch((error) => console.log("error", error));
}

function Login() {
  return (
    <div className="login">
      <form className="form" onSubmit={handleLogin}>
        <Input placeholder="Нэр" name="firstName" suffix={<UserOutlined />} />
        <br />
        <Input.Password
          placeholder="Нууц үг"
          name="passWord"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <br />
        <button type="submit" className="btnLogin">
          Нэвтрэх
        </button>
      </form>
    </div>
  );
}

export default Login;
