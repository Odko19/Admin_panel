import React, { useState, useEffect } from "react";
import { Button, Radio, message } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/cover.css";

const UploadCover = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [user, setUser] = useState([]);

  const [placement, SetPlacement] = useState();
  const placementChange = (e) => {
    return SetPlacement(e.target.value);
  };
  let navigate = useNavigate();
  // SetUser
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  //

  //POST Submit

  function onClickUpload(e) {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var formdata = new FormData();
    formdata.append("type", placement);
    formdata.append("image", e.target.images1.files[0]);
    formdata.append("created_by", user?.id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/coverimg`, requestOptions)
      .then((response) => response.text())
      .then(async (result) => {
        if (JSON.parse(result).success === true) {
          await navigate("/cover");
          await message.success("Амжилттай");
        } else {
          message.error("Амжилтгүй");
        }
      })
      .catch((error) => console.log("error", error));
  }

  //Update
  //Delete

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  return (
    <section className="coverSection">
      <div className="coverRadio">
        <Radio.Group
          value={placement}
          onChange={placementChange}
          style={{ width: "40%" }}
        >
          <Radio.Button value="resident" style={{ width: "50%" }}>
            Хувь хүн
          </Radio.Button>
          <Radio.Button value="business" style={{ width: "50%" }}>
            Байгууллага
          </Radio.Button>
        </Radio.Group>
      </div>
      <form onSubmit={onClickUpload}>
        <label className="coverLabel">
          + Add Images
          <br />
          <span className="coverSpan">Зурагаа оруулна уу</span>
          <br />
          <input
            type="file"
            accept="image/*"
            name="images1"
            // onChange={onSelectFile}
            multiple
            // accept="image/png , image/jpeg, image/webp"
          />
        </label>
        <br />

        <div className="images">
          {selectedImages &&
            selectedImages.map((image, index) => {
              return (
                <div key={image} className="image">
                  <img
                    className="coverImgImg"
                    src={image}
                    style={{ height: "150px" }}
                    alt="upload"
                  />
                  <Button
                    className="inImgBtn"
                    onClick={() => deleteHandler(image)}
                  >
                    Delete
                  </Button>
                </div>
              );
            })}
        </div>
        <button type="submit" className="coverBtnSave">
          Save
        </button>
      </form>
    </section>
  );
};

export default UploadCover;
