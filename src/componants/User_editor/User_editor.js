import React from "react";
import { notification } from "antd";
import "../../styles/product.css";

function User_editor({ data }) {
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
    // formdata.append("product_id", data.product_id);
    // formdata.append("product_name", e.target.name.value);
    // formdata.append("product_img", e.target.image.files[0]);
    // formdata.append("product_price", e.target.price.value);
    // formdata.append("product_performance", e.target.performance.value);
    // formdata.append("product_type", e.target.select.value);
    // formdata.append("created_by", "1");

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
    // formdata.append("product_name", e.target.name.value);
    // formdata.append("product_img", e.target.image.files[0]);
    // formdata.append("product_price", e.target.price.value);
    // formdata.append("product_performance", e.target.performance.value);
    // formdata.append("product_type", e.target.select.value);
    // formdata.append("created_by", "1");

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
              <label className="input_label">Нэр</label>
              <input
                type="text"
                name="name"
                className="input_pro"
                defaultValue={data.firstName}
              />
            </div>

            <div className="input_div_in_pro">
              <label className="input_label">Нууц үг</label>
              <input
                type="password"
                name="password"
                className="input_pro"
                defaultValue={data.password}
              />
            </div>
            <div className="input_div_in_pro">
              <label className="input_label">Зөвшөөрөл</label>
              <input className="input_pro" />
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
              <label className="input_label">Нэр</label>
              <input type="text" name="name" className="input_pro" />
            </div>

            <div className="input_div_in_pro">
              <label className="input_label">Нууц үг</label>
              <input type="password" name="password" className="input_pro" />
            </div>
            <div className="input_div_in_pro">
              <label className="input_label">Зөвшөөрөл</label>
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

export default User_editor;
