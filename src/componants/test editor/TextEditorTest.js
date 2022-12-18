import React, { Component, useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useLocation } from "react-router";

import axios from "axios";

function TextEditorTest() {
  const [body, setBody] = useState();
  const [edit, setEdit] = useState();

  const { state } = useLocation();
  console.log(state.url === "edit");
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setBody(editorRef.current.getContent());
    }
  };

  function handleBtn(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("title", "title");
    formdata.append("cover_img", e.target.image.files[0]);
    formdata.append("body", body);
    formdata.append("created_by", "1");
    formdata.append("type", "bonus");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:3001/v1/news", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  function handleBtnEdit(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("id", edit.id);
    formdata.append("title", edit.title);
    formdata.append("body", body);
    formdata.append("created_by", edit.created_by);
    formdata.append("type", edit.type);
    formdata.append("cover_img", e.target.image.files[0]);
    var requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:3001/v1/news", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    if (state.id) {
      fetch(`http://localhost:3001/v1/news/?id=${state.id}`)
        .then((response) => response.json())
        .then((result) => setEdit(result))
        .catch((error) => console.log("error", error));
    }
  }, [state]);

  return (
    <div>
      <form onSubmit={state.url === "edit" ? handleBtnEdit : handleBtn}>
        <input accept="image/*" type="file" multiple name="image" />
        {state.url === "edit" ? (
          <Editor
            initialValue={edit?.body}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 500,
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
        ) : (
          <Editor
            initialValue={edit?.body}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 500,
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
        )}
        <button onClick={log}>submit</button>
      </form>
    </div>
  );
}

export default TextEditorTest;
