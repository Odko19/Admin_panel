import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Space, Avatar, ConfigProvider, Radio} from "antd";
import { useNavigate, Route, Routes } from "react-router-dom";
import { PoweroffOutlined, UserOutlined, ChromeOutlined} from "@ant-design/icons";
import EditorProduct from "./Product_editor/Product_editor";
import EditorUser from "./User_editor/User_editor";
import EditorCreate from "./Editor/EditorCreate";
import Shareholders from "./Shareholders";
import Account from "./Account";
import Breadcrumbs from "./Breadcrumb";
import Product from "./Product";
import News from "./News";
import User from "./User";
import "../styles/mainbody.css";
import {  MenuFoldOutlined,  MenuUnfoldOutlined, FileTextOutlined, DollarCircleOutlined, StockOutlined,
 UserAddOutlined, FileAddOutlined, BoxPlotOutlined, PhoneOutlined} from "@ant-design/icons";
import ResNumber from "./ResNumber";
import Addjob from "./Addjob";
import Order from "./Order";
import Joblist from "./Joblist";

//  Logout
const { Header, Sider, Content} = Layout;
const handleClickAgain3=() => {
  localStorage.clear();
  window.location.href='/login'
}
//
// Open new tab
const openInNewTab = url => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
//

function Main() {

  // Dark Theme
  const [currentTheme, setCurrentTheme] = useState("light");
  const lightTheme ={ 

    }
    const darkTheme = {
        colorPrimary: "black",
        colorTextBase: "white",
        colorTextLightSolid: "white",
        colorBgBase: '#303030',
        colorPrimaryHover: "#40a9ff",
    }

// const changeTheme = (value) => {
//   if(!value) {
//     setCurrentTheme("light")
//   } else {
//     setCurrentTheme("dark")
//   }
// }


  const [user, setUser] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const onSelectMenu = (item) => {
    navigate(item.key);
  };

//   if (window.innerWidth < 1200) {
//     setCollapsed(true)
// } else {
//     setCollapsed(false)
// }


// LocalStroage
  useEffect(() => {
    if(localStorage.getItem("user")){
     setUser(JSON.parse(localStorage.getItem("user")))
    }
  }, [])
//
  

  return (
    <ConfigProvider
theme={{
  token: 
    currentTheme === "light" ? lightTheme :darkTheme
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
        width='14%'
        style={{
          backgroundColor: currentTheme === "light"? '#194569' : 'black',
          color: "white",
          height: "100%",
        }}
      >
        <div
          style={{
            padding: "25px",
            // backgroundColor: "#bae7ff",
            color : "#fff",

          }}
        >
  <Avatar  style={{marginRight: 20}} shape="square" size="large" icon={<UserOutlined />} /> 
  {user.firstName}
        </div>
        <Menu
          style={{
            marginTop: "10px",
            backgroundColor: currentTheme === "light"? '#194569' : 'black',
            color: "white",
          }}
          defaultSelectedKeys={"/"}
          onClick={onSelectMenu}
          items={[
            {
              key: "/",
              icon: <FileTextOutlined />,
              label: "Мэдээ / Урамшуулал",
            },
            {
              key: "/account",
              icon: <DollarCircleOutlined />,
              label: "Шилэн данс",
            },
            
            {
              key: "/product",
              icon: <BoxPlotOutlined />,
              label: "Бүтээгдэхүүн",
            },
  
            {
              key: "/user",
              icon: <UserAddOutlined />,
              label: "Админ нэмэх",
            },
            {
              key: "/shareholders",
              icon: <StockOutlined />,
              label: "Хувьцаа эзэмшигч",
            },
            {
              key: "/numberorderlist",
              icon: <PhoneOutlined />,
              label: "Дугаарын мэдээлэл",
            },

            {
              key: "/order",
              icon: <FileAddOutlined />,
              label: "Захиалга",

            },
            {
              key: "/job",
              icon: <FileAddOutlined />,
              label: "Ажлын зар",
            },
            {
              key:"/Web",
              icon: <ChromeOutlined />,
              label: <a  href="someLink" onClick={() => openInNewTab('http://10.0.10.126:3000/')} >Вэб хуудас</a>
            },
          ]}
        />
      </Sider>
      <Layout
      theme="dark"
        className="site-layout"
        style={{
        }}
      >
        <Header
          style={{
            backgroundColor: currentTheme === "light"? '#fff' : '#212121',
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
<Space direction="horizontal" style={{width: '96%', justifyContent: 'end'}}>
          <Radio.Group value={currentTheme} onChange={(e)=> setCurrentTheme(e.target.value)}>
            <Radio value={"light"}>Light ☀️</Radio>
            <Radio value={"dark"}>Dark 🌙</Radio>
        </Radio.Group>

        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={handleClickAgain3}     >    Logout
        </Button>

        </Space>
        </Header>

        <Content style={{padding:'0 50px', 
        // backgroundColor: "whitesmoke", 
        // backgroundColor: currentTheme === "light"? '#whitesmoke' : '#212121',
        borderRadius: "0 10px 10px 0"}}>

<div style={{margin: '16px 0', color: "red"}}>
  <Breadcrumbs />
  </div>
        <div style={{background: '#fff', padding:24, minHeight:"90%",
         backgroundColor: currentTheme === "light"? '#FFFFFF' : ""}}>
        <Routes>
            <Route path="/" element={<News />} />
            <Route path="/account" element={<Account />} />
            <Route path="/shareholders" element={<Shareholders />} />
            <Route path="/product" element={<Product />}></Route>
            <Route path="/editor" element={<EditorCreate />} />
            <Route path="/product/create" element={<EditorProduct />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/create" element={<EditorUser />} />
            <Route path="/numberOrderList" element={<ResNumber />} />
            <Route path="/job" element={<Joblist />} />
            <Route path="/job/create" element={<Addjob />} />
            <Route path="/order" element={<Order />} />
          </Routes>
          </div>
        </Content>
    

      </Layout>
    </Layout>
    </ConfigProvider>
  );
}

export default Main;
