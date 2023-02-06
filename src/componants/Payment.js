import React, { useState, useEffect } from "react";
import { Table } from 'antd'

function Payment() {

    const [data, setData] = useState();
    const [select, setSelect] = useState();
    const [page, setPage] = useState();
    // GET
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/payment?page=1&limit=6`)
          .then((response) => response.json())
          .then((result) => {
            setData(
              result.data.map((row, i) => ({
                INVOICE_DESC: row.INVOICE_DESC,
                PAYMENT_WALLET:row.PAYMENT_WALLET,
                AMOUT:row.AMOUT,
                EMAIL:row.EMAIL,
                ACCOUNT_NUMBER: row.ACCOUNT_NUMBER,
                CREATED_DATE: row.CREATED_DATE,
                PAYMENT_STATUS: row.PAYMENT_STATUS,
                EBARIMT_STATUS:row.EBARIMT_STATUS,
                SETTLEMENTS_STATUS:row.SETTLEMENTS_STATUS,
                LINKEG_ID:row.LINKEG_ID,
                key: i,
              }))
            );
            setPage(result);
          })
          .catch((error) => console.log("error", error));
      }, []);
    
    //
    const columns = [
        {
            title: "INvoice_desc",
            dataIndex: "INVOICE_DESC",
            key: "product_name",
          },
          {
            title: "Payment Wallet",
            dataIndex: "product_name",
            key: "product_name",
          },
        {
          title: "Дүн",
          dataIndex: "product_name",
          key: "product_name",
        },
        {
          title: "Email",
          dataIndex: "product_price",
          key: "product_price",
        },
        {
            title: "P/status",
            dataIndex: "product_price",
            key: "product_price",
          },
        {
          title: "Огноо",
          dataIndex: "product_type",
          key: "product_type",
        },


      ];
  return (
    <div>
          <Table
          style={{marginTop: "20px"}}
            columns={columns}
            dataSource={data}
            // pagination={{
            //   position: ["bottomCenter"],
            //   pageSize: page?.currentPageSize,
            //   current: page?.currentPage,
            //   total: page?.totalDatas,
            //   onChange: (page) => handlePageChange(page),
            // }}
          />

    </div>
  )
}

export default Payment