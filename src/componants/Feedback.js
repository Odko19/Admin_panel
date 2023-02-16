import React, { useState, useEffect } from "react";
import {SmileTwoTone, MehTwoTone, FrownTwoTone } from "@ant-design/icons";
import { Table,} from 'antd';
import "../styles/feedback.css";
import moment from "moment";



function Feedback() {

    const [data, setData] = useState();
    const [page, setPage] = useState();
 

//  GET 
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/feedback?page=1&limit=6`)
          .then((response) => response.json())
          .then((result) => {
            setData(
              result.data.map((row, i) => ({
                count:row.count,
                comment: row.comment,
                cr_date: moment(row.cr_date).format("L"),
                star: row.star,
                key: i,
              }))
            );
            setPage(result);
          })
          .catch((error) => console.log("error", error));
      }, []);
      

// Pagination

function handlePageChange(page) {
    fetch(`${process.env.REACT_APP_BASE_URL}/feedback?page=${page}&limit=6`)
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            comment: row.comment,
            cr_date: moment(row.cr_date).format("L"),
            star: row.star,
            key: i,
          }))
        );
        setPage(result);
      })
      .catch((error) => console.log("error", error));
  }
//

//
    const columns = [
        {
          title: "Сэтгэгдэл",
          dataIndex: "comment",
          key: "comment",
          width: "75%"
        },
        {
          title: "Reaction",
          dataIndex: "star",
          key: "star",
          render: (text,row) => <span style={{color: "#ACDF87"}}>{row["star"]==="5"?"😀 Smile":row["star"]==="4"?<li style={{color: "#ACDF87"}}>😀 Smile
          </li>:row["star"]==="3"?<li style={{color: "#FEFF9E"}}>🫤 meh
          </li>:row["star"]==="2"?<li style={{color: "#FF9D5C"}}>🙁 frown
          </li>: <li style={{color: "#FF9D5C"}}>🙁 frown
          </li>}
          </span>
        },
        {
          title: "Хэзээ",
          dataIndex: "cr_date",
          key: "cr_date",
        },
    ]

  return (
    <div>

             <div style={{display: "flex",}}>
              
             <div  className='smilebox1' style={{backgroundColor : "#5ced73"}}>
              <SmileTwoTone style={{ fontSize: '220%', marginLeft: 10}}/><div  className="countstar">{page?.count.five}</div> 
              </div> 
           
             <div  className='smilebox1' style={{backgroundColor : "#ACDF87"}}>
              <SmileTwoTone style={{ fontSize: '220%', marginLeft: 10}}/><div  className="countstar">{page?.count.four}</div>
              </div> 
              
              <div className='smilebox1' style={{backgroundColor : "#FEFF9E"}}>
              <MehTwoTone style={{ fontSize: '220%',  marginLeft: 10}}/><div  className="countstar" >{page?.count.three}</div>
              </div>
              <div className='smilebox1' style={{backgroundColor : "#FF9D5C"}}>
              <FrownTwoTone style={{ fontSize: '220%',  marginLeft: 10}}/> <span   className="countstar">{page?.count.two}</span>
              </div>
              <div className='smilebox1' style={{backgroundColor : "#ff8b3d"}}>
              <FrownTwoTone style={{ fontSize: '220%',  marginLeft: 10}}/><span   className="countstar"> {page?.count.one}</span>
              </div>
            </div>
      
      
        <Table  
         dataSource={data} style={{marginTop: "20px"}} columns={columns}
          pagination={{
            position: ["bottomCenter"],
            pageSize: page?.currentPageSize,
            current: page?.currentPage,
            total: page?.totalDatas,
            onChange: (page) => handlePageChange(page),
          }}/>
    </div>
  )
}

export default Feedback
