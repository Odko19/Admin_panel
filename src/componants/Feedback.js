import React, { useState, useEffect } from "react";
import {SmileTwoTone, MehTwoTone, FrownTwoTone } from "@ant-design/icons";
import { Table } from 'antd';
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
            // console.log(result)
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
      }, []);

// Pagination
// console.log(data)
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
 {/* {        
                        data.map((row, i) => ( */}
                            <div style={{display: "flex",}}>
                            <div className='smilebox1' style={{backgroundColor : "#ACDF87"}}>
                             <SmileTwoTone style={{ fontSize: '220%', marginLeft: 10}}/>
                             </div>
                           
                             <div className='smilebox1' style={{backgroundColor : "#FEFF9E"}}>
                             <MehTwoTone style={{ fontSize: '220%',  marginLeft: 10}}/>
                             </div>
                             <div className='smilebox1' style={{backgroundColor : "#FF9D5C"}}>
                             <FrownTwoTone style={{ fontSize: '220%',  marginLeft: 10}}/>
                             </div>
                           </div>
                    {/* //         )                       )
                         
                    // } */}


       
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

// import React, { useState } from 'react';

// const feedbackData = [
//   { id: 1, message: "The service was excellent!", reactions: { thumbsUp: 5, thumbsDown: 2 } },
//   { id: 2, message: "I had a terrible experience.", reactions: { thumbsUp: 1, thumbsDown: 7 } },
//   { id: 3, message: "The food was delicious!", reactions: { thumbsUp: 9, thumbsDown: 1 } },
//   { id: 4, message: "The staff was rude.", reactions: { thumbsUp: 2, thumbsDown: 6 } },
// ];

// function Feedback() {
//   return (
//     <div>
//       <h2>Feedback Dashboard</h2>
//       {feedbackData.map(feedback => (
//         <div key={feedback.id}>
//           <p>{feedback.message}</p>
//           <p>Thumbs Up: {feedback.reactions.thumbsUp}</p>
//           <p>Thumbs Down: {feedback.reactions.thumbsDown}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Feedback;
