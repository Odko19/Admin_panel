import React, {useState,} from 'react'
import { Button, Input, Form, Checkbox, Divider, message, Select} from 'antd';

import { useNavigate } from "react-router-dom";
import {  MenuFoldOutlined,  MenuUnfoldOutlined, FileTextOutlined, StockOutlined,
  UserAddOutlined, FileAddOutlined, BoxPlotOutlined, PhoneOutlined, CheckCircleOutlined, DollarCircleOutlined , IssuesCloseOutlined} from "@ant-design/icons";

function User_editor({data}) {
  console.log(data)

//
let navigate = useNavigate();
//
  //Checkbox
  const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Мэдээ / Урамшуулал', 'Ажлын зар', 'Админ нэмэх', 'Санал хүсэлт', 'Төлбөр төлөлт', 'Захиалга', 'Дугаарын мэдээлэл', 'Хувьцаа эзэмшигч', 'Бүтээгдэхүүн'];
const defaultCheckedList = ['Мэдээ / Урамшуулал'];

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [location, setLocation] = useState()
  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
//Checkbox/>

const arr2=[];
function handlerArr(arr) {
  arr.map((e) => {
    if (e === "Мэдээ / Урамшуулал") {
      arr2.push({ name: "Мэдээ / Урамшуулал",icon:"FileTextOutlined", to: "/" });
    } else if (e === "Ажлын зар") {
       arr2.push({ name: "Ажлын зар",icon:"FileAddOutlined", to: "/job" });
    } else if(e==="Бүтээгдэхүүн"){
      arr2.push({ name: "Бүтээгдэхүүн",icon:"BoxPlotOutlined", to: "/product" });
    } else if(e==="Хувьцаа эзэмшигч"){
          arr2.push({ name: "Хувьцаа эзэмшигч",icon:"StockOutlined", to: "/shareholders" });
    } else if(e==="Дугаарын мэдээлэл"){
          arr2.push({ name: "Дугаарын мэдээлэл",icon:"PhoneOutlined", to: "/numberorderlist" });
    } else if(e==="Захиалга"){
          arr2.push({ name: "Захиалга",icon:"CheckCircleOutlined", to: "/order" });
    } else if(e==="Төлбөр төлөлт"){
          arr2.push({ name: "Төлбөр төлөлт",icon:"DollarCircleOutlined", to: "/Payment" });
    } else if(e==="Санал хүсэлт"){
          arr2.push({ name: "Санал хүсэлт",icon:"IssuesCloseOutlined", to: "/feedback" });
    } else if(e==="Админ нэмэх"){
          arr2.push({ name: "Админ нэмэх",icon:"UserAddOutlined", to: "/user" });
    } 
    
  });

}

handlerArr(checkedList)


//Location 
const onChangeSelect = (value) => {
    setLocation(value)
};
const onSearch = (value) => {
  // console.log('search:', value);
};

//
    const [password,setPassword] = useState(null);
    const [firstName, setFirstName] = useState(data? data.firstName: null);

    // UPDate Edit
  const handleEdit = ()=> {
  
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
"firstName": firstName,
"password": password,
"permission": arr2,
"location":location,
"id":data.id,
});


var requestOptions = {
method: 'PUT',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch(`${process.env.REACT_APP_BASE_URL}/users`, requestOptions)
.then(response => response.text())
.then(async(result) => { 
  if(JSON.parse(result).success === true){
    await navigate('/')
    await message.success('Амжилттай')

} else {
message.error('Амжилтгүй')
}
})
.catch(error => console.log('error', error));
}

    // Post Request SUBMIT CREATE
    const handleSubmit  = () => {
        
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "firstName": firstName,
  "password": 111111,
  "permission":arr2,
  "location":location
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${process.env.REACT_APP_BASE_URL}/users`, requestOptions)
  .then(response => response.text())
  .then(async(result) => { if(JSON.parse(result).success === true){
    await navigate('/user')
    await message.success('Амжилттай бүртгэгдлээ')
  } else {
    message.error('Бүртгэл амжилтгүй')
  }
    })
    .catch(error => console.log('error', error));
  }

    //
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    }
    //Signup
    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    //

      
  return (
    data ?<div className='Adduser_container'>
      
    <>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          Check all
        </Checkbox>
        <Divider />
        <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
      </>
      
  {/* Login  */}
  
  <div style={{marginTop: "20px"}}>
  <Form
        name="basic" wrapperCol={{ span: 16}} initialValues={{ "firstName": data.firstName, }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
  
        <Form.Item  name="firstName"
          rules={[
            {
              required: true,
              message: 'Нэрээ оруулна уу!',
            },
          ]}
        >
    <Input value={firstName} id="firstName" onChange = {(e) => handleInputChange(e)} placeholder="Name"  style={{width: 300}}/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Нууц үгээ оруулна уу!',
            },
          ]}
        >
        <Select
        style={{width: "300px"}}
    showSearch
    placeholder="Байршилаа"
    optionFilterProp="children"
    onChange={onChangeSelect}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={[
      {
        value: 'УБ',
        label: 'Улаанбаатар',
      },
      {
        value: 'Баганхангай',
        label: 'Баганхангай',
      },
      
      {
        value: 'Архангай',
        label: 'Архангай',
      },
      {
        value: 'Баянхонгор',
        label: 'Баянхонгор',
      },
      {
        value: 'Баян-Өлгий',
        label: 'Баян-Өлгий',
      },
            {
        value: 'Булган',
        label: 'Булган',
      },
            {
        value: 'Говь-Алтай',
        label: 'Говь-Алтай',
      },
            {
        value: 'Говьсүмбэр',
        label: 'Говьсүмбэр',
      },
            {
        value: 'Дархан-уул',
        label: 'Дархан-уул',
      },
            {
        value: 'Дорнод',
        label: 'Дорнод',
      },
            {
        value: 'Дорноговь',
        label: 'Дорноговь',
      },
            {
        value: 'Дундговь',
        label: 'Дундговь',
      },
            {
        value: 'Завхан',
        label: 'Завхан',
      },
      {
        value: 'Орхон',
        label: 'Завхан',
      },
      {
        value: 'Өвөрхангай',
        label: 'Завхан',
      },
      {
        value: 'Өмнөговь',
        label: 'Завхан',
      },
      {
        value: 'Сүхбаатар',
        label: 'Сүхбаатар',
      },
      {
        value: 'Сэлэнгэ',
        label: 'Сэлэнгэ',
      },
      {
        value: 'Төв',
        label: 'Төв',
      },
      {
        value: 'Увс',
        label: 'Увс',
      },
      {
        value: 'Ховд',
        label: 'Ховд',
      },
      {
        value: 'Хөвсгөл',
        label: 'Хөвсгөл',
      },
      {
        value: 'Хэнтий',
        label: 'Хэнтий',
      },
    ]}
  />
        </Form.Item>

      </Form>
  
  </div>
  <Button htmlType="submit" style={{marginTop: 10}} onClick={()=>handleEdit()} type="primary" icon={<UserAddOutlined/>}  >  Edit
  </Button>
      </div> : <div className='Adduser_container'>
      
      <>
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Check all
          </Checkbox>
          <Divider />
          <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
        </>
        
    {/* Login  */}
    
    <div style={{marginTop: "20px"}}>
    <Form
          name="basic" wrapperCol={{ span: 16}} initialValues={{ remember: true, }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
    
          <Form.Item  name="username"
            rules={[
              {
                required: true,
                message: 'Нэрээ оруулна уу!',
              },
            ]}
          >
      <Input  value={firstName} id="firstName" onChange = {(e) => handleInputChange(e)} placeholder="Name"  style={{width: 300}}/>
          </Form.Item>
          {/* <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Нууц үгээ оруулна уу!',
              },
            ]}
          >
        <Input.Password  value={password} id="password" onChange = {(e) => handleInputChange(e)} placeholder="Password"  style={{width: 300}}/>
          </Form.Item> */}
    
      
        <Select
        style={{width: "300px"}}
    showSearch
    placeholder="Байршилаа"
    optionFilterProp="children"
    onChange={onChangeSelect}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={[
      {
        value: 'УБ',
        label: 'Улаанбаатар',
      },
      {
        value: 'Баганхангай',
        label: 'Баганхангай',
      },
      
      {
        value: 'Архангай',
        label: 'Архангай',
      },
      {
        value: 'Баянхонгор',
        label: 'Баянхонгор',
      },
      {
        value: 'Баян-Өлгий',
        label: 'Баян-Өлгий',
      },
            {
        value: 'Булган',
        label: 'Булган',
      },
            {
        value: 'Говь-Алтай',
        label: 'Говь-Алтай',
      },
            {
        value: 'Говьсүмбэр',
        label: 'Говьсүмбэр',
      },
            {
        value: 'Дархан-уул',
        label: 'Дархан-уул',
      },
            {
        value: 'Дорнод',
        label: 'Дорнод',
      },
            {
        value: 'Дорноговь',
        label: 'Дорноговь',
      },
            {
        value: 'Дундговь',
        label: 'Дундговь',
      },
            {
        value: 'Завхан',
        label: 'Завхан',
      },
      {
        value: 'Орхон',
        label: 'Завхан',
      },
      {
        value: 'Өвөрхангай',
        label: 'Завхан',
      },
      {
        value: 'Өмнөговь',
        label: 'Завхан',
      },
      {
        value: 'Сүхбаатар',
        label: 'Сүхбаатар',
      },
      {
        value: 'Сэлэнгэ',
        label: 'Сэлэнгэ',
      },
      {
        value: 'Төв',
        label: 'Төв',
      },
      {
        value: 'Увс',
        label: 'Увс',
      },
      {
        value: 'Ховд',
        label: 'Ховд',
      },
      {
        value: 'Хөвсгөл',
        label: 'Хөвсгөл',
      },
      {
        value: 'Хэнтий',
        label: 'Хэнтий',
      },
    ]}
  />
        </Form>
    </div>
    <Button htmlType="submit" style={{marginTop: 10}} onClick={()=>handleSubmit()} type="primary" icon={<UserAddOutlined/>}  >  Create    </Button>
        </div>
  )
}
export default User_editor