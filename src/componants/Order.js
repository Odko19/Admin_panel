import React, { useEffect, useState} from 'react'
import { Table, Modal, Button,Pagination, Checkbox, Input} from 'antd';
import "../styles/ordercss.css";
import { SearchOutlined} from "@ant-design/icons";

function Order() {
    const [data, setData] = useState();
    const [page, setPage] = useState();
    const [user, setUser] = useState([]);
    const [modaldata, setModaldata] = useState([]);


//SWITCH
const [checkValue, setCheckValue] = useState();
const [checkState, setCheckState] = useState();

const onChange = (e) => {
  setCheckValue(e.target.value);
  setCheckState(e.target.checked);
};

//LocalStroage user 
useEffect(() => {
  if(localStorage.getItem("user")){
   setUser(JSON.parse(localStorage.getItem("user")))
  }
}, [])
//


  
//

    // ONCLICK MODAL
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (record) => {
      
    setModaldata(record);
    setIsModalVisible(true);
    };
    const handleOk = (record) => {
 
                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                    
                      var raw = JSON.stringify({
                        ID : record,
                        OPERATOR_ID : user.id,
                        OPERATOR_STATUS: 1,
                      
                      });
                      
                      var requestOptions = {
                        method: 'PUT',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                      };
                      
                      fetch(`${process.env.REACT_APP_BASE_URL}/order`, requestOptions)
                        .then(response => response.text())
                        .then(result => console.log(result))
                        .catch(error => console.log('error', error));
                     
    setIsModalVisible(false);
    };

    const handleCancel = () => {
    setIsModalVisible(false);
    };
    //
    //


   // GET
  useEffect(() => {
    if (user?.location !== undefined) {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/order?page=1&limit=5&location=${user?.location}`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(
            result.data.map((row, i) => ({
              FIRST_NAME: row.FIRST_NAME,
              LAST_NAME: row.LAST_NAME,
              CUST_TYPE: row.CUST_TYPE,
              MOBILE: row.MOBILE,
              EMAIL: row.EMAIL,
              CITY: row.CITY,
              DISTRICT: row.DISTRICT,
              KHOROO: row.KHOROO,
              APARTMENT: row.APARTMENT,
              DOOR: row.DOOR,
              ENTRANCE: row.ENTRANCE,
              REGISTER: row.REGISTER,
              RESULT: row.RESULT,
              SERVICE: row.SERVICE,
              ID: row.ID,
              OPERATOR_ID: row.OPERATOR_ID,
              OPERATOR_STATUS: row.OPERATOR_STATUS,
              ADDITIONAL: row.ADDITIONAL,
              key: i,
            }))
          );
          setPage(result);
        })
        .catch((error) => console.log("error", error));
    }
  }, [modaldata, user]);

      // Pagination

     function handlePageChange(page) 
    {
         fetch(`${process.env.REACT_APP_BASE_URL}/order?page=${page}&limit=5&location=${user?.location}`)
      .then((response) => response.json())
      .then((result) => {
       
      setData (
        result.data.map((row, i) => ({
        FIRST_NAME: row.FIRST_NAME,
        LAST_NAME: row.LAST_NAME,
        CUST_TYPE: row.CUST_TYPE,
        MOBILE: row.MOBILE,
        EMAIL: row.EMAIL,
        CITY: row.CITY,
        DISTRICT: row.DISTRICT,
        KHOROO: row.KHOROO,
        APARTMENT: row.APARTMENT,
        DOOR: row.DOOR,
        ENTRANCE: row.ENTRANCE,
        REGISTER: row.REGISTER,
        RESULT: row.RESULT,
        SERVICE: row.SERVICE,
        ID: row.ID,
        OPERATOR_ID: row.OPERATOR_ID,
        OPERATOR_STATUS: row.OPERATOR_STATUS,
        ADDITIONAL: row.ADDITIONAL,
        key: i,
      }))
      )
      setPage(result);
     
    })
    .catch((error) => console.log("error", error));
}


const columns = [
    {
        title: '????????',
        width: "13%",
        dataIndex: 'LAST_NAME',
        key: 'LAST_NAME',
        
      },
      {
        title: '??????',
        width: "13%",
        dataIndex: 'FIRST_NAME',
        key: 'FIRST_NAME',
      },
      {
        title: '????????',
        width: "9%",
        dataIndex: 'MOBILE',
        key: 'MOBILE',
      },
      {
        title: '????',
        width: "12%",
        dataIndex: 'REGISTER',
        key: 'REGISTER',
      },

    {
      title: 'Email',
      width: "14%",
      dataIndex: 'EMAIL',
      key: 'EMAIL',
    },
    {
        title: '????????',
        width: "32%",
        dataIndex: ['CITY', 'DISTRICT'],
        key: 'address',
        render: (text,row) => <span  style={{color: "black"}}>{row["CITY"]} {row["DISTRICT"]} 
        {/* {row["KHOROO"]} {row["APARTMENT"]} {row["ENTRANCE" ]} ?????? {row["DOOR"]} ???????? */}
         </span>,
        },
        {
          title: '??????????',
          width: "13%",
          dataIndex: 'OPERATOR_STATUS' ,
          key: 'OPERATOR_STATUS',
          render: (text,row) => <span style={{color : "#1890ff"}}>{row["OPERATOR_STATUS"]===1?"??????????????????":<li style={{color: "#ff675f"}}>??????????????????????</li>}</span>
        },
        {
          title: '??????????????????????',
          width: "12%",
          dataIndex: '',
          key: 'action',
          render: (record) =>( 

          <Button type="primary"
        onClick={()=>showModal(record)}>
            ??????????
            </Button>
            )
        },
      
  ];
  return (


    <div>
        
       <Modal
       
        title="?????????????????????? ????????????????"
        style={{top: 20}}
        open={isModalVisible} 
        onOk={()=>handleOk(modaldata.ID)}
        onCancel={handleCancel}
      >
        <div className='pt'>
        <div className='p1'><div style={{width: "160px"}}>???????? : </div>{modaldata.LAST_NAME}</div>
        <div className='p2'><div style={{width: "160px"}}>?????? : </div>{modaldata.FIRST_NAME}</div>
        <div className='p1'><div style={{width: "160px"}}>???????? : </div>{modaldata.MOBILE}</div>
        <div className='p2'><div style={{width: "160px"}}>?????????????? : </div>{modaldata.REGISTER}</div>
        <div className='p1'><div style={{width: "160px"}}>??????/??????????: </div>{modaldata.CITY}</div>
        <div className='p2'><div style={{width: "160px"}}>???????????? / ?????? : </div>{modaldata.DISTRICT}</div>
        <div className='p1'><div style={{width: "160px"}}>???????? : </div>{modaldata.APARTMENT}</div>
        <div className='p2'><div style={{width: "160px"}}>?????? :  </div>{modaldata.ENTRANCE}</div>
        <div className='p1'><div style={{width: "160px"}}>???????? :  </div>{modaldata.DOOR}</div>
        <div className='p2'><div style={{width: "160px"}}>???????? ?????? / ?????????????????????? : </div>{modaldata.CUST_TYPE}</div>
        <div className='p1'><div style={{width: "160px"}}>Email : </div>{modaldata.EMAIL}</div>
        <div style={{height: "65px"}} className='p2'>???????????? ??????????????: {modaldata.ADDITIONAL}</div>
        <p>
                <>
            {modaldata.OPERATOR_STATUS === null ? (
              <Checkbox
                onChange={onChange}
                checked={checkValue === modaldata.ID ? checkState : false}
                value={modaldata.ID}
              >
                {checkState === true && checkValue === modaldata.ID
                  ? "??????????????????"
                  : "??????????????????????"}
              </Checkbox>
            ) : (
              <Checkbox checked={true}>??????????????????</Checkbox>
            )}
          </>
            </p>
        </div>

    

      </Modal>
      <Input
                        onChange={e => {
                          if(e.target.value.length > 0 ){
                            const filteredData = data.filter(entry =>
                              entry.MOBILE.toLowerCase().includes(e.target.value)
                            );
                            setData(filteredData);
                          
                          } else {
                            console.log(e.target.value.length)
                            window.location.reload(false);
                          }                    
                                      }}
              placeholder=" ???????????? ?????????????????? ?????????? ????"
              style={{marginBottom: "20px"}}
              suffix={<SearchOutlined />}
            />
        <Table 
style={{ height: '450px' }}
        dataSource={data} columns={columns} 
  pagination={false}
          /> 
            <Pagination
          pageSize={1}
          current={page?.currentPage}
          total={page?.totalPages}
         onChange={(page)=>handlePageChange(page)}
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        />
       
    </div>
  )
}

export default Order