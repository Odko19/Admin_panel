import React, { useState, useEffect } from "react";
import { Table, Button, notification, Modal, Badge} from 'antd';
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Addjob from "./Addjob";
function Joblist() {
  const [page, setPage] = useState();
  const [data, setData] = useState();
  const [select, setSelect] = useState();
  const [cvdata, setCvdata] = useState([]);
  const [camecv, setCamecv] = useState([]);
 
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);  

  const showModal = (record) => {
     setIsModalOpen(true);
     camecv.map((e)=>{
      if(e.cv_workplace_id === record){
         setCvdata(e.cv_name)
      } return   ""
     })
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
// Notificaton
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
  //

    //  Edit UPDATE
    let navigate = useNavigate();
    function handleBtnEdit(record) {
      setSelect(record);
    }

    function handleBtnCreate() {
        navigate("/job/create");
      }
//

// Delete
function handlerBtnDlt(id) {
  var requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };
  fetch(`${process.env.REACT_APP_BASE_URL}/workplace/?id=${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {

        if (result.success === true) {
          openNotification("success");
          fetch(`${process.env.REACT_APP_BASE_URL}/workplace/?page=1&limit=6`)
    .then((response) => response.json())
    .then((result) => { 
      setCamecv(result.cv)
    
      setData(
        result.data.map((row, i) => ({
          workplace_id: row.workplace_id,
          workplace_name: row.workplace_name,
          workplace_role: row.workplace_role,
          workplace_requirements: row.workplace_requirements,
          workplace_type: row.workplace_type,
          created_at: moment(row.created_at).format("L"),
          expires_at: moment(row.expires_at).format("L"),
          updated_at: row.updated_at,
          cv:row,
          key: i,
          
        }))
      );
      
      setPage(result);
    })
    .catch((error) => console.log("error", error));
        } else {
          openNotification("error");
        }
    })
    .catch((error) => console.log("error", error));
}
//
// GET

useEffect(() => {
  fetch(`${process.env.REACT_APP_BASE_URL}/workplace/?page=1&limit=6`)
    .then((response) => response.json())
    .then((result) => { 
      setCamecv(result.cv)

      setData(
        result.data.map((row, i) => ({
          workplace_id: row.workplace_id,
          workplace_name: row.workplace_name,
          workplace_role: row.workplace_role,
          workplace_requirements: row.workplace_requirements,
          workplace_type: row.workplace_type,
          workplace_type_value :row.workplace_type_value,
          created_at: moment(row.created_at).format("L"),
          expires_at: moment(row.expires_at).format("L"),
          updated_at: row.updated_at,
          cv:row,
          key: i,

        }))
      );
      
      setPage(result);
    })
    .catch((error) => console.log("error", error));
}, []);

//
// Pagination
function handlePageChange(page) {
  fetch(`${process.env.REACT_APP_BASE_URL}/workplace/?page=${page}&limit=6`)
    .then((response) => response.json())
    .then((result) => {
      setCamecv(result.cv)
    
      setData(
        result.data.map((row, i) => ({
          workplace_id: row.workplace_id,
          workplace_name: row.workplace_name,
          workplace_role: row.workplace_role,
          workplace_requirements: row.workplace_requirements,
          workplace_type: row.workplace_type,
          created_at: moment(row.created_at).format("L"),
          expires_at: moment(row.expires_at).format("L"),
          updated_at: row.updated_at,
          cv:row, 
          key: i,
        }))
      );
      
      setPage(result);
    })
    .catch((error) => console.log("error", error));
}
//
    const columns = [
        {
          title: 'Салбар',
          dataIndex: 'workplace_type',
          key: 'workplace_type',
          width: "25%"

        },
        {
         title: 'Мэргэжил',
          dataIndex: 'workplace_name',
          key: 'workplace_name',
          width: "25%"
        },
        {
          title: 'Н / Огноо',
          dataIndex: 'created_at',
          key: 'expires_at',
          width: "10%"
        }, 
        {
          title: 'Д / Огноо',
          dataIndex: 'expires_at',
          key: 'expires_at',
          width: "10%"
        }, 
          {
            title: "Засах",
            key: "edit",
            dataIndex: "key",

            render: (text, record) => (
              <button className="btnEdit" onClick={() => handleBtnEdit(record)}>
                <EditOutlined />
              </button>
            ),
          },
          {
            title: "Устгах",
            key: "delete",

            render: (text, record) => (
              <button
                className="btnDlt"
                onClick={() => handlerBtnDlt(record.workplace_id)}
              >
                <DeleteOutlined />
              </button>
            ),
          },
          {
            title: 'Ирсэн CV',
            dataIndex: "cv",
            key: 'workpace_id',
  
          render: (record) =>( 
            camecv.map((e ,i)=>{
              if(e.cv_workplace_id === record.workplace_id){
             return   <Badge key={i} count={e.cv_name.length} style={{}}>  
                <Button type="primary"  onClick={()=>showModal(record.workplace_id)}>
                Ирсэн CV    
               </Button></Badge>
              } return ""
             })
            )
          }, 
      ];

  return (

    <div>        
      {select ? (
      <Addjob select={select} className="width" />
    ) : (
    <div>
    <Button onClick={handleBtnCreate} type="primary" style={{width: "15%", marginBottom: 20}} >Ажлын зар нэмэх</Button>
  <Button style={{marginLeft: 20, width: "15%"}} onClick={() => window.location.href = `${process.env.REACT_APP_PUSH_URL}/humanresources`} type="primary">Вэб дээр харах</Button>
    <Table dataSource={data} columns={columns} 

style={{ height: '450px' }}
                pagination={{
                  position: ["bottomCenter"],
                  pageSize: page?.currentPageSize,
                  current: page?.currentPage,
                  total: page?.totalDatas,
                  onChange: (page) => handlePageChange(page),
                }}/> </div>
                )}
                    <Modal 
                  
                    style={{top: 20,}}
                    title="Ирсэн CV" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
{

  cvdata?.map((e , index)=>{
    return <p key={index}> 
   {index+1}.       
<span > {e.firstName} </span>  
   <a key={index}
                 href={`${process.env.REACT_APP_BASE_URL}/uploads/${e.cv}`}
                 target="_blank"
                 rel="noopener noreferrer"
               >

                  {e.cv}
               </a></p>
  }) 
}
                  
      </Modal>
    </div>
  )
}
export default Joblist
