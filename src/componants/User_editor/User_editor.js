import React, {useState} from 'react'
import { Button, Input, Form, Checkbox, Divider, message} from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
function User_editor() {
//

//
  //Checkbox
  const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Мэдээ / Урамшуулал', 'Ажлын зар', 'Шилэн данс', 'Шинэ захиалга'];
const defaultCheckedList = ['Мэдээ / Урамшуулал'];

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
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

    const [password,setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
  
    // Post Request
    const handleSubmit  = () => {
        
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "firstName": firstName,
  "password": password,
  "permission": checkedList
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${process.env.REACT_APP_BASE_URL}/users`, requestOptions)
  .then(response => response.text())
  .then(result => { if(JSON.parse(result).success === true){

    message.success('Амжилттай бүртгэгдлээ')
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
    <div className='Adduser_container'>
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
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Нууц үгээ оруулна уу!',
          },
        ]}
      >
    <Input.Password  value={password} id="password" onChange = {(e) => handleInputChange(e)} placeholder="Password"  style={{width: 300}}/>
      </Form.Item>
    </Form>

</div>
<Button htmlType="submit" style={{marginTop: 10}} onClick={()=>handleSubmit()} type="primary" icon={<UserAddOutlined/>}  >  Create
</Button>
    </div>
  )
}
export default User_editor