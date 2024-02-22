import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useLocation } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notification, Radio, Input, DatePicker } from "antd";
import "../../styles/editor.css";

function EditorCreate() {
  let navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [placement, SetPlacement] = useState();
  const placementChange = (e) => {
    return SetPlacement(e.target.value);
  };
  const [userchoise, SetUserchoise] = useState();
  const userchoiseChange = (e) => {
    return SetUserchoise(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const { state } = useLocation();

  const [body, setBody] = useState();
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setBody(editorRef.current.getContent());
    }
  };

  const openNotification = (type) => {
    if (type === "error") {
      notification[type]({
        message: "Амжилтгүй",
        duration: 3,
      });
    } else {
      notification[type]({
        message: "Амжилттай нийтэллээ",
        duration: 3,
      });
    }
  };
  // Post
  function handleBtnCreate(e) {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("title", e.target.title.value);
    formdata.append("cover_img", e.target.image.files[0]);
    formdata.append("body", body);
    formdata.append("created_by", user?.id);
    if (state === "news") {
      formdata.append("type", placement);
      formdata.append("customer_type", userchoise);
      if (placement === "bonus") {
        formdata.append("expires_at", e.target.expire.value);
      }
    }
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/${state}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          openNotification("success");
          navigate("/");
        } else {
          openNotification("error");
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="news">
      <form onSubmit={handleBtnCreate} className="content">
        <div>
          <div>
            <div className="input_div">
              <div className="input_div_in">
                <label>Гарчиг</label>
                <Input
                  style={{ height: "32px", width: "70%", marginLeft: "15%" }}
                  type="text"
                  name="title"
                  className="input"
                />
              </div>
              <div className="input_div_in">
                <label className="input_label m_left">Нүүр зураг </label>
                <input
                  accept="image/*"
                  className="input_border"
                  type="file"
                  name="image"
                />
              </div>
            </div>
            {state === "news" ? (
              <>
                <div className="input_div">
                  <div className="input_div_in">
                    <label>Төрөл</label>
                    <Radio.Group
                      value={placement}
                      onChange={placementChange}
                      style={{ width: "70%", marginLeft: "15%" }}
                    >
                      <Radio.Button value="news" style={{ width: "50%" }}>
                        Мэдээлэл
                      </Radio.Button>
                      <Radio.Button value="bonus" style={{ width: "50%" }}>
                        Урамшуулал
                      </Radio.Button>
                    </Radio.Group>
                  </div>

                  {placement === "bonus" ? (
                    <div className="input_div_in">
                      <label className="input_label m_left">
                        Дуусах хугацаа
                      </label>
                      <DatePicker className="input" type="date" name="expire" />
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <label>Төрөл</label>
                <Radio.Group
                  value={userchoise}
                  onChange={userchoiseChange}
                  style={{ width: "35%", marginLeft: "7.5%", marginBottom: 20 }}
                >
                  <Radio.Button style={{ width: "50%" }} value="business">
                    Байгууллага
                  </Radio.Button>
                  <Radio.Button style={{ width: "50%" }} value="resident">
                    Хувь хүн
                  </Radio.Button>
                </Radio.Group>
              </>
            ) : (
              ""
            )}
          </div>

          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey="ykxkjlhd2fvg9a7438npciyxbqlml47jlo2izm9flcrbp4jv"
            init={{
              height: "55vh",
              menubar: true,

              plugins: [
                "a11ychecker",
                "advlist",
                "advcode",
                "advtable",
                "autolink",
                "checklist",
                "export",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "powerpaste",
                "fullscreen",
                "formatpainter",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | casechange blocks | bold italic backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
              selector: "textarea#drive",
              file_picker_types: "file image media",
              quickbars_insert_toolbar: "quickimage quicktable ",
              quickbars_image_toolbar:
                "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
              quickbars_selection_toolbar:
                "bold italic alignleft aligncenter alignright alignjustify ",
              automatic_uploads: true,
              file_picker_callback: function (cb, value, meta) {
                var input = document.createElement("input");
                if (meta.filetype === "file") {
                  input.setAttribute("type", "file");
                  input.onchange = function () {
                    var file = this.files[0];
                    var reader = new FileReader();
                    reader.onload = function () {
                      var id = "blobid" + new Date().getTime();
                      var blobCache = editorRef.current.editorUpload.blobCache;
                      var base64 = reader.result.split(",")[1];
                      var blobInfo = blobCache.create(id, file, base64);
                      let data = new FormData();
                      data.append("file", blobInfo.blob());
                      axios
                        .post(
                          `${process.env.REACT_APP_BASE_URL}/image/file`,
                          data
                        )
                        .then(function (res) {
                          res.data.file.map((file) => {
                            return cb(
                              `${process.env.REACT_APP_BASE_URL}/uploads/${file}`
                            );
                          });
                        })
                        .catch(function (err) {
                          console.log(err);
                        });
                    };
                    reader.readAsDataURL(file);
                  };
                  input.click();
                }
                if (meta.filetype === "image") {
                  // var input = document.createElement("input");
                  input.setAttribute("type", "file");
                  input.setAttribute("accept", "image/*");

                  input.onchange = function () {
                    var file = this.files[0];
                    var reader = new FileReader();
                    reader.onload = function () {
                      var id = "blobid" + new Date().getTime();
                      var blobCache = editorRef.current.editorUpload.blobCache;
                      var base64 = reader.result.split(",")[1];
                      var blobInfo = blobCache.create(id, file, base64);
                      let data = new FormData();
                      data.append(
                        "cover_img",
                        blobInfo.blob(),
                        blobInfo.filename()
                      );
                      axios
                        .post(`${process.env.REACT_APP_BASE_URL}/image`, data)
                        .then(function (res) {
                          res.data.images.map((image) => {
                            return cb(
                              ` ${process.env.REACT_APP_API_URL}/uploads/${image}`
                            );
                          });
                        })
                        .catch(function (err) {
                          console.log(err);
                        });
                    };
                    reader.readAsDataURL(file);
                  };
                  input.click();
                }
              },
            }}
          />
        </div>
        <button type="submit" onClick={log} className="btn_submit">
          Хадгалах
        </button>
      </form>
    </div>
  );
}

export default EditorCreate;
