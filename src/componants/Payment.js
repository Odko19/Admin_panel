import React, { useState, useEffect } from "react";
import { Table, Modal, Button} from 'antd'
import moment from "moment";
import "../styles/ordercss.css";

function Payment() {

    const [data, setData] = useState();
    const [page, setPage] = useState();
    //Modal Onclick
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modaldata, setModaldata] = useState([]);
  
    const showModal = (record) => {

        setModaldata(record);
        setIsModalVisible(true);
        };
        const handleCancel = () => {
            setIsModalVisible(false);
            };
     
    //
    // GET REQUEST

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/payment?page=1&limit=6`)
          .then((response) => response.json())
          .then((result) => {
            setData(
              result.data.map((row, i) => ({
                
                INVOICE_DESC: row.INVOICE_DESC,
                PAYMENT_WALLET:row.PAYMENT_WALLET,
                TRANS_ID: row.TRANS_ID,
                AMOUNT:row.AMOUNT,
                EMAIL:row.EMAIL,
                ACCOUNT_NUMBER: row.ACCOUNT_NUMBER,
                CREATED_DATE: moment(row.CREATED_DATE).format("L"),
                PAYMENT_STATUS: row.PAYMENT_STATUS,
                EBARIMT_STATUS:row.EBARIMT_STATUS,
                SETTLEMENTS_STATUS:row.SETTLEMENTS_STATUS,
                LINKEG_ID:row.LINKEG_ID,
                STATUS:row.STATUS,
                CARD_TYPE:row.CARD_TYPE,
                ID:row.ID,
                ACCOUNT_BANK_NAME:row.ACCOUNT_BANK_NAME,
                PAYMENT_TYPE:row.PAYMENT_TYPE,
                PAYMENT_CURRENCY:row.PAYMENT_CURRENCY,
                key: i,
              }))
            );
            setPage(result);
          })
          .catch((error) => console.log("error", error));
      }, []);
    
    //
    //Pagination
    function handlePageChange(page) {
        fetch(`${process.env.REACT_APP_BASE_URL}/payment?page=${page}&limit=7`)
          .then((response) => response.json())
          .then((result) => {
            setData(
              result.data.map((row, i) => ({
                INVOICE_DESC: row.INVOICE_DESC,
                PAYMENT_WALLET:row.PAYMENT_WALLET,
                TRANS_ID: row.TRANS_ID,
                AMOUNT:row.AMOUNT,
                EMAIL:row.EMAIL,
                ACCOUNT_NUMBER: row.ACCOUNT_NUMBER,
                CREATED_DATE: moment(row.CREATED_DATE).format("L"),
                PAYMENT_STATUS: row.PAYMENT_STATUS,
                EBARIMT_STATUS:row.EBARIMT_STATUS,
                SETTLEMENTS_STATUS:row.SETTLEMENTS_STATUS,
                LINKEG_ID:row.LINKEG_ID,
                STATUS:row.STATUS,
                CARD_TYPE:row.CARD_TYPE,
                ID:row.ID,
                ACCOUNT_BANK_NAME:row.ACCOUNT_BANK_NAME,
                PAYMENT_TYPE:row.PAYMENT_TYPE,
                PAYMENT_CURRENCY: row.PAYMENT_CURRENCY,
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
            title: "ID",
            dataIndex: "ID",
            key: "ID",
          },
        {
            title: "???????????????????? ????????",
            dataIndex: "INVOICE_DESC",
            key: "INVOICE_DESC",
          },
          {
            title: "??????",
            dataIndex: "AMOUNT",
            key: "AMOUNT",
          },  
          {
            title: "Payment Wallet",
            dataIndex: "PAYMENT_WALLET",
            key: "PAYMENT_WALLET",
          },
   
        {
          title: "CARD_TYPE",
          dataIndex: "CARD_TYPE",
          key: "product_price",
        },
        {
            title: "P/status",
            dataIndex: "STATUS",
            key: "STATUS",
            render: (text,row) => <span style={{color : "#4C9a2a"}}>{row["STATUS"]==="S"?"Paid":<li style={{color: "#f01e2c"}}>Unpaid</li>}</span>
          },
 
        {
            title: "??????????",
            dataIndex: "CREATED_DATE",
            key: "product_type",
          },
          {
            title: "??????????????????????",
            dataIndex: "",
            key: "product_type",
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
        onOk={handleCancel}
        onCancel={handleCancel}
        >
      <div className='pt'>
        <div className='p1'><div style={{width: "160px"}}>???????????????????? ???????? : </div>{modaldata.INVOICE_DESC}</div>
        <div className='p2'><div style={{width: "160px"}}>?????????? ??????: </div>{modaldata.AMOUNT}</div>
        <div className='p1'><div style={{width: "160px"}}>???????? : </div>{modaldata.PAYMENT_WALLET}</div>
        <div className='p2'><div style={{width: "160px"}}> ?????????? : </div>{modaldata.PAYMENT_CURRENCY}</div>
        <div className='p1'><div style={{width: "160px"}}>???????????????????? ???????? : </div>{modaldata.ACCOUNT_NUMBER}</div>
        <div className='p2'><div style={{width: "160px"}}>???????????? : </div>{modaldata.STATUS}</div>
        <div className='p1'><div style={{width: "160px"}}>LINKEG_ID : </div>{modaldata.LINKEG_ID}</div>
        <div className='p2'><div style={{width: "160px"}}>??-???????????? ???????????? : </div>{modaldata.EBARIMT_STATUS}</div>
        <div className='p1'><div style={{width: "160px"}}>???????????? ?????????? : </div>{modaldata.CARD_TYPE}</div>
        <div className='p2'><div style={{width: "160px"}}>???????????????????? ?????????? : </div>{modaldata.PAYMENT_TYPE}</div>
        <div className='p1'><div style={{width: "160px"}}>Email : </div>{modaldata.EMAIL}</div>
</div>
        </Modal>
          <Table
            style={{ height: '450px' }}
            columns={columns}
            dataSource={data}
            pagination={{
              position: ["bottomCenter"],
              pageSize: page?.currentPageSize,
              current: page?.currentPage,
              total: page?.totalDatas,
              onChange: (page) => handlePageChange(page),
            }}
          />

    </div>
  )
}

export default Payment