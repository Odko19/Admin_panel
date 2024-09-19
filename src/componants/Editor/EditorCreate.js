import React, { useState, useRef, useEffect, useMemo } from "react";
import Jodit from "jodit-react"
import HTMLReactParser from "html-react-parser";
import { useLocation, useHistory } from "react-router-dom";
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

  const [body, setBody] = useState("");
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setBody(editorRef.current.getContent());
    }
  };

  const config = useMemo(() => ({
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
      format: 'json',
      method: 'POST',
      withCredentials: false,
      url: `${process.env.REACT_APP_BASE_URL}/image/file`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      queryBuild: function (data) {
        return JSON.stringify(data);
      },
      contentType: function () {
        return 'application/json';
      },
      buildData: function (files) {
        const formData = new FormData();
        if (Array.isArray(files) && files.every(file => file instanceof Blob)) {
          files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
          });
        } else {
          console.error("Invalid files object:", files);
          return null;
        }
        return formData;
      },
      prepareData: async function (formData) {
        const file = formData.getAll("files[0]")[0];
        try {
          const formData = new FormData();
          formData.append('file', file);
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/image/file`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          const fileUrl = response.data.file.map((file) => {
            return `${process.env.REACT_APP_BASE_URL}/uploads/${file.file}`;
          });
          const originalFilename = response.data.file[0].name
          const decodedFilename = decodeURIComponent(escape(originalFilename));
          setBody(prevContent => `${prevContent}<a href="${fileUrl[0]}" target="_blank">${decodedFilename}</a>`);
        } catch (error) {
          console.error('Error uploading file:', error);
          return null;
        }
      },
      buildData: function (data) {
        return data;
      },
      isSuccess: function (resp) {
        return !resp.error;
      },
      getMessage: function (response) {
        if (response && response.msgs) {
          return response.msgs.join("\n");
        } else {
          return "Error: No messages found";
        }
      },
      process: function (resp) {
        console.log(resp);
        return {
          files: resp.data.message,
          path: resp.message,
          baseurl: resp.message,
          error: resp.message,
          message: resp.message

        };
      },
      defaultHandlerSuccess: function (data, resp) {
        const files = data.files || [];
        if (files.length) {
          this.selection.insertImage(files[0], null, 250);
        }
      },
    },


  }),);

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
          <Jodit
            ref={editorRef}
            value={body}
            config={config}
            tabIndex={1}
            onBlur={(newBody) => setBody(newBody)}

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
