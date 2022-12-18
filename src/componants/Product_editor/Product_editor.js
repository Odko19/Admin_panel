import React, { useState } from "react";
import { notification } from "antd";
import "../../styles/product.css";

function Product_editor({ data }) {
  const openNotification = (type) => {
    if (type === "error") {
      notification[type]({
        message: "error",
        duration: 0,
      });
    } else {
      notification[type]({
        message: "create",
        duration: 0,
      });
    }
  };

  function handleBtnUpdate(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("product_id", data.product_id);
    formdata.append("product_name", e.target.name.value);
    formdata.append("product_img", e.target.image.files[0]);
    formdata.append("product_price", e.target.price.value);
    formdata.append("product_performance", e.target.performance.value);
    formdata.append("product_type", e.target.select.value);
    formdata.append("created_by", "1");

    var requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:3001/v1/product", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          openNotification("success");
        } else {
          openNotification("error");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function handleBtnCreate(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("product_name", e.target.name.value);
    formdata.append("product_img", e.target.image.files[0]);
    formdata.append("product_price", e.target.price.value);
    formdata.append("product_performance", e.target.performance.value);
    formdata.append("product_type", e.target.select.value);
    formdata.append("created_by", "1");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:3001/v1/product", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          openNotification("success");
        } else {
          openNotification("error");
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="product">
      {data ? (
        <form onSubmit={handleBtnUpdate} className="content">
          <div>
            <div className="input_div_in_pro">
              <label className="input_label_pro">Нэр</label>
              <input
                type="text"
                name="name"
                className="input_pro"
                defaultValue={data.product_name}
              />
            </div>
            <div className="input_div_in_pro">
              <label className="input_label_pro">Бүтээгдэхүүний зураг </label>
              <input
                accept="image/*"
                className="input_border"
                type="file"
                name="image"
              />
            </div>
            <div className="input_div_in_pro">
              <label className="input_label_pro">Бүтээгдэхүүний Үнэ</label>
              <input
                type="number"
                name="price"
                className="input_pro"
                defaultValue={data.product_price}
              />
            </div>
            <div className="input_div_in_pro">
              <label className="input_label_pro">Төрөл</label>
              <select
                className="input_pro"
                name="select"
                selected
                defaultValue={data.product_type}
              >
                <option value="news">Мэдээ</option>
                <option value="bonus">Урамшуулал</option>
                <option value="phone">phone</option>
              </select>
            </div>
            <div className="input_div_in_pro">
              <label className="input_label_pro">Тайлбар</label>
              <textarea
                className="input_pro performance"
                name="performance"
                defaultValue={data.product_performance}
              ></textarea>
            </div>
          </div>
          <button className="btn_submit" type="submit">
            submit
          </button>
        </form>
      ) : (
        <form onSubmit={handleBtnCreate} className="content">
          <div>
            <div className="input_div_in_pro">
              <label className="input_label_pro">Нэр</label>
              <input type="text" name="name" className="input_pro" />
            </div>
            <div className="input_div_in_pro">
              <label className="input_label_pro">Бүтээгдэхүүний зураг </label>
              <input
                accept="image/*"
                className="input_border"
                type="file"
                name="image"
              />
            </div>
            <div className="input_div_in_pro">
              <label className="input_label_pro">Бүтээгдэхүүний Үнэ</label>
              <input type="number" name="price" className="input_pro" />
            </div>
            <div className="input_div_in_pro">
              <label className="input_label_pro">Төрөл</label>
              <select className="input_pro" name="select" selected>
                <option value="news">Мэдээ</option>
                <option value="bonus">Урамшуулал</option>
                <option value="phone">phone</option>
              </select>
            </div>
            <div className="input_div_in_pro">
              <label className="input_label_pro">Тайлбар</label>
              <textarea
                className="input_pro performance"
                name="performance"
              ></textarea>
            </div>
          </div>
          <button className="btn_submit" type="submit">
            submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Product_editor;
