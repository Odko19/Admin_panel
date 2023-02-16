import React, { useState, useEffect } from "react";
import "../../styles/product.css";
import { notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";

function Product_editor() {
  const [data, setData] = useState();
  const [user, setUser] = useState([]);
  let navigate = useNavigate();
  const { id } = useParams();

  // Localstroage USER
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    fetch(`${process.env.REACT_APP_BASE_URL}/product/?id=${id}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => console.log("error", error));
  }, [id]);
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
        message: "Created",
        duration: 3,
      });
    }
  };
  const openNotifUpdate = (type) => {
    if (type === "error") {
      notification[type]({
        message: "error",
        duration: 3,
      });
    } else {
      notification[type]({
        message: "Updated",
        duration: 3,
      });
    }
  };
  //

  // Update
  function handleBtnUpdate(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("product_id", data.product_id);
    formdata.append("product_name", e.target.name.value);
    formdata.append("product_img", e.target.image.files[0]);
    formdata.append("product_price", e.target.price.value);
    formdata.append("product_performance", e.target.performance.value);
    formdata.append("product_type", e.target.select.value);
    formdata.append("created_by", user.id);

    var requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/product`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          openNotifUpdate("success");
          navigate("/product");
        } else {
          openNotifUpdate("error");
        }
      })
      .catch((error) => console.log("error", error));
  }
  //

  // Create (post)
  function handleBtnCreate(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("product_name", e.target.name.value);
    formdata.append("product_img", e.target.image.files[0]);
    formdata.append("product_price", e.target.price.value);
    formdata.append("product_performance", e.target.performance.value);
    formdata.append("product_type", e.target.select.value);
    formdata.append("created_by", user.id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/product`, requestOptions)
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
  //

  return (
    <div className="product">
      {id && data ? (
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
                <option value="Telephone">Суурин утас</option>
                <option value="Modem">Модем</option>
                <option value="Wife router">Wife router</option>
                <option value="Grand stream">Grand stream</option>
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
                <option value="Telephone">Суурин утас</option>
                <option value="Modem">Модем</option>
                <option value="Wife router">Wife router</option>
                <option value="Grand stream">Grand stream</option>
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

          <button type="submit" className="btn_submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Product_editor;
