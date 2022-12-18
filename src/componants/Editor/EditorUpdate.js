import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { notification } from "antd";
import "../../styles/editor.css";

function EditorUpdate({ data, type }) {
  const [body, setBody] = useState();
  const [selectType, setSelectType] = useState();

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setBody(editorRef.current.getContent());
    }
  };

  const openNotification = (type) => {
    if (type === "error") {
      notification[type]({
        message: "error",
        duration: 0,
      });
    } else {
      notification[type]({
        message: "update",
        duration: 0,
      });
    }
  };

  function handleSelect(e) {
    e.preventDefault();
    setSelectType(e.target.value);
  }

  function handleBtnEdit(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("id", data.id);
    formdata.append("title", e.target.title.value);
    formdata.append("body", body);
    formdata.append("created_by", 1);
    formdata.append("cover_img", e.target.image.files[0]);
    if (type === "news") {
      formdata.append("type", e.target.select.value);
      if (selectType === "bonus") {
        formdata.append("expires_at", e.target.expire.value);
      }
    }
    var requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow",
    };
    fetch(`http://localhost:3001/v1/${type}`, requestOptions)
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
    <div className="news">
      <form onSubmit={handleBtnEdit} className="content">
        <div>
          <div>
            <div className="input_div">
              <div className="input_div_in">
                <label className="input_label">Гарчиг</label>
                <input
                  type="text"
                  name="title"
                  className="input"
                  defaultValue={data.title}
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
            {type === "news" ? (
              <div className="input_div">
                <div className="input_div_in">
                  <label className="input_label">Төрөл</label>
                  <select
                    className="input"
                    onChange={handleSelect}
                    selected
                    defaultValue={data.type}
                    name="select"
                  >
                    <option value="news">Мэдээ</option>
                    <option value="bonus">Урамшуулал</option>
                  </select>
                </div>
                {data.type === "bonus" ? (
                  <div className="input_div_in">
                    <label className="input_label m_left">Дуусах хугацаа</label>
                    <input type="date" name="expire" className="input" />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <Editor
            initialValue={data?.body}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
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
                if (meta.filetype === "file") {
                  var input = document.createElement("input");
                  input.setAttribute("type", "file");
                  input.onchange = function () {
                    // console.log(this.files);
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
                        .post("http://localhost:3001/v1/image/file", data)
                        .then(function (res) {
                          res.data.file.map((file) => {
                            return cb(
                              `http://localhost:3001/v1/uploads/${file}`
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
                  var input = document.createElement("input");
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
                        .post("http://localhost:3001/v1/image", data)
                        .then(function (res) {
                          res.data.images.map((image) => {
                            return cb(
                              `http://localhost:3001/v1/uploads/${image}`
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
        <button onClick={log} className="btn_submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default EditorUpdate;
