import React, { useState, useRef, useEffect, useMemo } from "react";
import  Jodit  from "jodit-react"
import axios from "axios";
import { notification, Radio, Input, DatePicker } from "antd";
import "../../styles/editor.css";
import moment from "moment";
function EditorUpdate({ data, type }) {
  const [placement, SetPlacement] = useState(data.type);
  const placementChange = (e) => {
    return SetPlacement(e.target.value);
  };
  const [userchoise, SetUserchoise] = useState(data.customer_type);
  const userchoiseChange = (e) => {
    return SetUserchoise(e.target.value);
  };
  const [body, setBody] = useState(data.body);
  const editorRef = useRef(null);
    useEffect(() => {
    setBody(data.body);
  }, [data.body]);
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
    filesExtensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
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
    isSuccess: function (resp) {
      return !resp.error;
    },
    getMessage: function (resp) {
  if (resp && resp.msgs) {
    return resp.msgs.join("\n");
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
}), []);
  const openNotification = (type) => {
    if (type === "error") {
      notification[type]({
        message: "error",
        duration: 3,
      });
    } else {
      notification[type]({
        message: "updated",
        duration: 3,
      });
    }
  };
  function handleBtnEdit(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("id", data.id);
    formdata.append("title", e.target.title.value);
    formdata.append("body", body);
    formdata.append("created_by", 1);
    formdata.append("cover_img", e.target.image.files[0]);
    if (type === "news") {
      formdata.append("type", placement);
      formdata.append("customer_type", userchoise);
      if (placement === "bonus") {
        formdata.append("expires_at", e.target.expire.value);
      }
    }
    var requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/${type}`, requestOptions)
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
                <Input
                  style={{ height: "32px", width: "70%", marginLeft: "15%" }}
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
              <div>
                <div className="input_div">
                  <div className="input_div_in">
                    <label>Төрөл</label>
                    <Radio.Group
                      value={placement}
                      onChange={placementChange}
                      style={{ width: "70%", marginLeft: "15%" }}
                    >
                      <Radio.Button style={{ width: "50%" }} value="news">
                        Мэдээлэл
                      </Radio.Button>
                      <Radio.Button style={{ width: "50%" }} value="bonus">
                        Урамшуулал
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                  {placement === "bonus" ? (
                    <div className="input_div_in">
                      <label className="input_label m_left">
                        Дуусах хугацаа
                      </label>
                      <DatePicker
                        className="input"
                        type="date"
                        name="expire"
                        defaultValue={moment(data.expires_at)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <label> Төрөл</label>
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
              </div>
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
export default EditorUpdate;
