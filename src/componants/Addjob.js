import React, { useState , useEffect} from "react";
import { Input, Radio, DatePicker, notification, Tag} from 'antd'
import { useNavigate } from "react-router-dom";
import "../styles/joblist.css";
import moment from "moment";
const { TextArea } = Input;

function Addjob({select}) {
  const [placement, SetPlacement] = useState();
  const placementChange = (e) => { 
    return SetPlacement(e.target.value);
    };

  // Local
  const [user, setUser] = useState([]);
  useEffect(() => {
    if(localStorage.getItem("user")){
     setUser(JSON.parse(localStorage.getItem("user")))
    }
  }, [])
  //

  // Notification
  const openNotification = (type) => {
    if (type === "error") {
      notification[type]({
        message: "error",
        duration: 3,
      });
    } else {
      notification[type]({
        message: "Амжилттай үүслээ",
        duration: 3,
      });
    }
  };
  const open2Notification = (type) => {
    if (type === "error") {
      notification[type]({
        message: "error",
        duration: 3,
      });
    } else {
      notification[type]({
        message: "Амжилттай шинэчлэгдлээ",
        duration: 3,
      });
    }
  };


// post
let navigate = useNavigate();
    function handleBtnCreate(e) {
      e.preventDefault();
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "workplace_name": e.target.profession_name.value,
  "workplace_role": e.target.role.value,
  "workplace_requirements": [e.target.requirements.value],
  "created_by": user.id,
  "workplace_type" : placement,
  "expires_at": e.target.datecreate.value
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${process.env.REACT_APP_BASE_URL}/workplace`, requestOptions)
.then((response) => response.json())
.then(async (result) => {
  if (result.success === true) {
    await openNotification("success");
    await navigate("/job")
  } else {
    openNotification("error");
  }
})
.catch((error) => console.log("error", error));  
    }
    //

//Update 
 function handleBtnUpdate(e) {
  e.preventDefault();



var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "workplace_id":select?.workplace_id,
    "workplace_name": e.target.profession_name.value,
    "workplace_role": e.target.role.value,
    "workplace_requirements": [e.target.requirements.value],
    "workplace_type": placement,
    "created_by": user.id,
    "expires_at": e.target.datecreate.value
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${process.env.REACT_APP_BASE_URL}/workplace`, requestOptions)
  .then(response => response.json())
  .then(async (result) => {
    if (result.success === true) {
      await open2Notification("success");
      await navigate("/job")
    } else {
      openNotification("error");
    }
  })
  .catch(error => console.log('error', error));
}
//
  return (

    <div>
          {select ? (
             <form onSubmit={handleBtnUpdate}>
             <div>
                    <Radio.Group   value={placement} onChange={placementChange}  style={{marginBottom: "20px"}}>
                    <Radio.Button value="1" >Инновац бизнес хөгжлийн газар</Radio.Button>
                        <Radio.Button value="2" >Техник технологийн ашиглалтын газар</Radio.Button>
                        <Radio.Button value="3" >Санхүү бүртгэл, аж ахуйн газар</Radio.Button>
                        <Radio.Button value="4" >Удирлага, хүний нөөцийн газар</Radio.Button>
                        <Radio.Button value="5" >Мэдээлэл технологийн төв</Radio.Button>
                        <Radio.Button value="6" >Маркетинг борлуулалтын газар</Radio.Button>
                           </Radio.Group>
                     
        
               <div className="input_job1">
               <label className="job_title" ><Tag color="cyan" style={{fontSize : 15,}}>Мэргэжил</Tag></label>
               <Input  defaultValue={select.workplace_name} name='profession_name'/>
                </div>
         
             <div   className="input_job1">
               <label  className="job_title"><Tag color="cyan" style={{fontSize : 15}}>Гүйцэтгэх үндсэн үүрэг</Tag></label>
               <TextArea defaultValue={select.workplace_role} name="role" className='textarea' showCount maxLength={500}  />
             </div>
             <div className="input_job1">
               <label className="job_title"><Tag color="cyan" style={{fontSize : 15}}>Тавигдах шаардлага</Tag></label>
               <TextArea defaultValue={select.workplace_requirements} name="requirements" className='textarea' showCount maxLength={500} />
             </div>
             <div className="input_job1">
          <label className="job_title" ><Tag color="cyan" style={{fontSize : 15}}>Дуусах хугацаа</Tag></label>
          <DatePicker  name="datecreate" 
          defaultValue={moment(select.expires_at)}
          style={{width: "100%"}} />
        </div>

             <button type="submit" className="btn_submit_job">Submit</button>
           </div>
           </form>
      
      ):( <form onSubmit={handleBtnCreate}>
        <div>
               <Radio.Group   value={placement} onChange={placementChange}   style={{marginBottom: "20px"}}>
                        <Radio.Button value="1" >Инновац бизнес хөгжлийн газар</Radio.Button>
                        <Radio.Button value="2" >Техник технологийн ашиглалтын газар</Radio.Button>
                        <Radio.Button value="3" >Санхүү бүртгэл, аж ахуйн газар</Radio.Button>
                        <Radio.Button value="4" >Удирлага, хүний нөөцийн газар</Radio.Button>
                        <Radio.Button value="5" >Мэдээлэл технологийн төв</Radio.Button>
                        <Radio.Button value="6" >Маркетинг борлуулалтын газар</Radio.Button>
                      </Radio.Group> 
                    
          <div className="input_job1">
          <label className="job_title" ><Tag color="cyan" style={{fontSize : 15,}}>Мэргэжил</Tag></label>
          <Input  name='profession_name'/>
           </div>
    
        <div   className="input_job1">
          <label style={{ alignItems: 'center', }}  className="job_title"><Tag color="cyan" style={{fontSize : 15}}>Гүйцэтгэх үндсэн үүрэг</Tag></label>
          <TextArea name="role" className='textarea' showCount maxLength={500} />
    
        </div>
        <div className="input_job1">
          <label className="job_title"><Tag color="cyan" style={{fontSize : 15}}>Тавигдах шаардлага</Tag></label>
          <TextArea  name="requirements" className='textarea' showCount maxLength={500}  />
        </div>

        <div className="input_job1">
          <label className="job_title"><Tag color="cyan" style={{fontSize : 15}}>Дуусах хугацаа</Tag></label>
          <DatePicker  name="datecreate" style={{width: "100%"}}/>
        </div>
        

        <button type="submit" className="btn_submit_job">Submit</button>
        
      </div>  
      </form>)}
     
  </div>
  )
}

export default Addjob;