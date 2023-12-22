import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Space,
  Avatar,
  ConfigProvider,
  Radio,
} from "antd";
import { useNavigate, Route, Routes } from "react-router-dom";
import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import EditorProduct from "./Product_editor/Product_editor";
import EditorUser from "./User_editor/User_editor";
import EditorNewsUpdate from "./Editor/EditorUpdate";
import EditorCreate from "./Editor/EditorCreate";
import ProductEditorUpdate from "./Product_editor/Product_editor";
import Shareholders from "./Shareholders";
import EbarimtId from "./EbarimtId";
import EbarimtIdEdit from "./EbarimtIdEdit";
import Account from "./Account";
import Breadcrumbs from "./Breadcrumb";
import Product from "./Product";
import News from "./News";
import User from "./User";
import "../styles/mainbody.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BoxPlotOutlined,
  StockOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  DollarCircleOutlined,
  IssuesCloseOutlined,
  UserAddOutlined,
  FileTextOutlined,
  FileAddOutlined,
  FileImageOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import ResNumber from "./ResNumber";
import Addjob from "./Addjob";
import Order from "./Order";
import Joblist from "./Joblist";
import Feedback from "./Feedback";
import Payment from "./Payment";
import FaceCover from "./FaceCover";
import UploadCover from "./UploadCover";

//  Logout
const { Header, Sider, Content } = Layout;
const handleClickAgain3 = () => {
  localStorage.clear();
  window.location.href = "/login";
};
//

function icongiver(icon) {
  if (icon === "BoxPlotOutlined") {
    return <BoxPlotOutlined />;
  } else if (icon === "StockOutlined") {
    return <StockOutlined />;
  } else if (icon === "PhoneOutlined") {
    return <PhoneOutlined />;
  } else if (icon === "CheckCircleOutlined") {
    return <CheckCircleOutlined />;
  } else if (icon === "DollarCircleOutlined") {
    return <DollarCircleOutlined />;
  } else if (icon === "IssuesCloseOutlined") {
    return <IssuesCloseOutlined />;
  } else if (icon === "UserAddOutlined") {
    return <UserAddOutlined />;
  } else if (icon === "FileTextOutlined") {
    return <FileTextOutlined />;
  } else if (icon === "FileAddOutlined") {
    return <FileAddOutlined />;
  } else if (icon === "FileImageOutlined") {
    return <FileImageOutlined />;
  } else if (icon === "FileSearchOutlined") {
    return <FileSearchOutlined />;
  }
}
function Main() {
  // Dark Theme
  const [currentTheme, setCurrentTheme] = useState("light");
  const lightTheme = {};
  const darkTheme = {
    colorPrimary: "black",
    colorTextBase: "white",
    colorTextLightSolid: "white",
    colorBgBase: "#303030",
    colorPrimaryHover: "#40a9ff",
  };

  const [user, setUser] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const onSelectMenu = (item) => {
    navigate(item.key);
  };

  // LocalStroage
  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (
        window.location.pathname !==
        JSON.parse(localStorage.getItem("user"))["permission"][0]["to"]
      ) {
        window.location.href = JSON.parse(localStorage.getItem("user"))[
          "permission"
        ][0]["to"];
      }
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  return (
    <ConfigProvider
      theme={{
        token: currentTheme === "light" ? lightTheme : darkTheme,
      }}
    >
      <Layout
        className="main"
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            backgroundColor: currentTheme === "light" ? "#194569" : "black",
            color: "white",
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div
            style={{
              padding: "25px",
              // backgroundColor: "#bae7ff",
              color: "#fff",
            }}
          >
            <Avatar
              style={{ marginRight: 20 }}
              shape="square"
              size="large"
              icon={<UserOutlined />}
            />
            {user.firstName}
          </div>
          <Menu
            style={{
              marginTop: "10px",
              backgroundColor: currentTheme === "light" ? "#194569" : "black",
              color: "white",
            }}
            defaultSelectedKeys={"/"}
            onClick={onSelectMenu}
            items={
              Object.values(user).length > 0
                ? user?.permission.map((e) => {
                    return {
                      key: e.to,
                      icon: icongiver(e.icon),
                      label: e.name,
                    };
                  })
                : false
            }
          />
        </Sider>
        <Layout
          theme="dark"
          className="site-layout"
          style={{
            marginLeft: 200,
          }}
        >
          <Header
            style={{
              backgroundColor: currentTheme === "light" ? "#fff" : "#212121",
              boxShadow: "0 3px 2px -2px gray",
              padding: "0px 20px 0px 20px",
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <Space
              direction="horizontal"
              style={{ width: "96%", justifyContent: "end" }}
            >
              <Radio.Group
                value={currentTheme}
                onChange={(e) => setCurrentTheme(e.target.value)}
              >
                <Radio value={"light"}>Light ☀️</Radio>
                <Radio value={"dark"}>Dark 🌙</Radio>
              </Radio.Group>

              <Button
                type="primary"
                icon={<PoweroffOutlined />}
                onClick={handleClickAgain3}
              >
                Logout
              </Button>
            </Space>
          </Header>

          <Content
            style={{
              padding: "0 50px",
              borderRadius: "0 10px 10px 0",
            }}
          >
            <div style={{ margin: "16px 0", color: "red" }}>
              <Breadcrumbs />
            </div>
            <div
              style={{
                background: "#fff",
                padding: 24,
                minHeight: "90%",
                backgroundColor: currentTheme === "light" ? "#FFFFFF" : "",
              }}
            >
              <Routes>
                <Route path="/" element={<News />} />
                <Route path="/account" element={<Account />} />
                <Route path="/shareholders" element={<Shareholders />} />
                <Route path="/product" element={<Product />} />
                <Route path="/editor" element={<EditorCreate />} />
                <Route path="/editor/:id" element={<EditorNewsUpdate />} />
                <Route path="/product/create/" element={<EditorProduct />} />
                <Route path="/product/:id" element={<ProductEditorUpdate />} />
                <Route path="/user" element={<User />} />
                <Route path="/user/create" element={<EditorUser />} />
                <Route path="/numberOrderList" element={<ResNumber />} />
                <Route path="/job" element={<Joblist />} />
                <Route path="/job/create" element={<Addjob />} />
                <Route path="/order" element={<Order />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/Payment" element={<Payment />} />
                <Route path="/ebarimt" element={<EbarimtId />} />
                <Route path="/ebarimt/edit" element={<EbarimtIdEdit />} />
                <Route path="/cover" element={<FaceCover />} />
                <Route path="/cover/upload" element={<UploadCover />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default Main;
