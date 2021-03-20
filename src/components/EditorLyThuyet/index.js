import { Col, Row, Input, Button, Modal, Upload } from "antd";
import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
import {
  LoadingOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { get } from "lodash";

import "./EditorLyThuyet.scss";
import { StoreContext } from "../../Context";

const { TextArea } = Input;

let timeOut = 0;

const TYPE = {
  QUESTION: "QUESTION",
  ANSWER: "ANSWER",
  ANSWER_KEY: {
    A: "A",
    B: "B",
    C: "C",
    D: "D",
  },
};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const EditorLyThuyet = (props) => {
  const [dataInput, setDataInput] = useState([]);
  const [listTextt, setListText] = useState([]);
  const [dataText, setDataText] = useState("");
  const [data, setData] = useState([]);
  const [isRenderLatex, setIsRenderLatex] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [MESS_ERR, SET_MESS_ERR] = useState({
    UPLOAD_IMG: "",
  });
  const [valueSelect, setValueSelect] = useState({
    value: TYPE.QUESTION,
    type: TYPE.QUESTION,
    answerKey: "",
  });

  const {
    editorState: [dataEditor, setDataEditor],
  } = useContext(StoreContext);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderLatex = useCallback(() => {
    if (window && window.MathJax) {
      if (typeof window.MathJax.Hub.Startup.Typeset === "function") {
        window.MathJax.Hub.Startup.Typeset();
      } else if (
        typeof window.MathJax.InputJax.TeX.resetEquationNumbers === "function"
      )
        window.MathJax.InputJax.TeX.resetEquationNumbers();
    }
  }, []);

  useEffect(() => {
    if (timeOut > 0) {
      clearTimeout(timeOut);
      timeOut = 0;
    } else {
      if (isRenderLatex) {
        timeOut = setTimeout(() => {
          renderLatex();
          clearTimeout(timeOut);
          timeOut = 0;
        }, 1000);
      }
    }
    return () => {
      clearTimeout(timeOut);
      timeOut = 0;
    };
  }, [dataText, dataInput, renderLatex, isRenderLatex]);

  useEffect(() => {
    setDataEditor({
      ...dataEditor,
      listLyThuyet: [
        ...dataEditor.listLyThuyet.slice(0, props.index),
        {
          ...dataEditor.listLyThuyet[props.index],
          noiDung: {
            ...dataEditor.listLyThuyet[props.index].noiDung,
            text: dataText,
            listText: listTextt,
            image: dataInput
          }
        },
        ...dataEditor.listLyThuyet.slice(props.index + 1)
      ]
    });

  }, [dataText, dataInput])

  const txaOnChange = (e) => {
    setDataText(e.target.value);
    setListText(e.target.value.split("image"));
  };

  const renderPreview = useMemo(() => {
    return (
      <>
        <h3>{dataEditor?.hashtag}</h3>
        {listTextt.map((item, index) => {
          return dataInput.length >= 1 ? (
            <>
              <p>{item}</p>
              <img src={dataInput[index]} />
            </>
          ) : (
            <p>{item}</p>
          );
        })}
      </>
    );
  }, [dataText, dataInput, dataEditor]);

  const uploadButton = useMemo(
    () => (
      <div>
        {loadingImage ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    ),
    []
  );

  const uploadImage = async (e) => {
    const imgType = e.files.file.type;

    const checkImageType =
      !imgType.split("/")[0] ||
      imgType.split("/")[0] !== "image" ||
      imgType.split("/")[1] === "gif";

    if (checkImageType) {
      const listErr = { ...MESS_ERR };
      listErr.UPLOAD_IMG = "Only Image";
      SET_MESS_ERR({ ...listErr });
      return;
    }
    if (e.files.fileList.length > 0 && e.files.file.status !== "uploading") {
      const file = get(e, "files.file", {});
      const _type = get(e, "type", TYPE.QUESTION);
      const _answerKey = get(e, "answerKey", "");

      const urlImage = await getBase64(file);
      const infoImg = {
        url: urlImage,
        name: get(file, "name", "img_math"),
      };

      const _dataInput = pushImageIntoArr(urlImage);

      setIsModalVisible(false);
      SET_MESS_ERR({});
      // return setDataInput({ ..._dataInput });
    }
  };

  const handleEditorWhenDeleteImage = () => {
    // setDataText("");
    // const temp = dataText.split("\n");
    // console.log('temp', temp.filter(''));
  };

  useEffect(() => {}, [dataInput]);

  const pushImageIntoArr = (str) => {
    setDataInput([...dataInput, str]);
    setDataText(`${dataText}\nimage\n`);
    setListText(dataText.split("image"));
  };

  const handleButtonRemove = (index) => {
    const _index = index;

    setDataInput(dataInput.filter((item, indexx) => indexx !== _index));

    handleEditorWhenDeleteImage();
  };

  const renderListImage = useMemo(() => {
    return (
      <Row className="wrap_item_iamge" style={{ marginTop: 10 }} gutter={10}>
        {dataInput.map((item, index) => {
          return (
            <Col className="image_item gutter-row" span={6}>
              <div className="temp_class">
                <img src={item} />
              </div>
              <Button
                onClick={() => handleButtonRemove(index)}
                danger
                type="primary"
                shape="circle"
                icon={<CloseOutlined />}
                className="x_button"
              ></Button>
            </Col>
          );
        })}
      </Row>
    );
  }, [dataInput]);

  return (
    <Row gutter={20} className="ly_thuyet">
      <Col span={8}>
        <h2>Editor</h2>
        <TextArea value={dataText} onChange={txaOnChange} rows={4} />
        {renderListImage}
      </Col>
      <Col className="wrap_preview" span={16}>
        <h2>Preview</h2>
        <div className="preview_ly_thuyet">{renderPreview}</div>
        <Button onClick={showModal} className="btn_upload_image">
          Upload Image
        </Button>
      </Col>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={() => false}
          onChange={(e) => {
            e.fileList.length > 0 &&
              e.file.status !== "uploading" &&
              uploadImage({
                files: e,
                type: get(valueSelect, "type", TYPE.QUESTION),
                answerKey: get(valueSelect, "answerKey", TYPE.ANSWER_KEY.A),
              });
          }}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </Modal>
    </Row>
  );
};

export default EditorLyThuyet;
