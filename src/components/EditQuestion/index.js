import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import {
  Input,
  Upload,
  Modal,
  Radio,
  Select,
  Form,
  Button,
  Switch,
} from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import "./create_question.scss";
import { get, set } from "lodash";
import useSelectedTag from "./useSelectedTag";
import { StoreContext } from "../../Context";
import Question from "../commons/question";

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
let timeOut = 0;

const Editor = (props) => {
  const arrChapterVsSession = {
    Chapter: ["Chapter_1", "Chapter_2", "Chapter_3", "Chapter_4"],
    Session: ["Session_1", "Session_2", "Session_3", "Session_4"],
  };
  const listSelectTag = [
    {
      name: "1",
      key: 1,
    },
    {
      name: "2",
      key: 2,
    },
    {
      name: "3",
      key: 3,
    },
    {
      name: "4",
      key: 4,
    },
    {
      name: "5",
      key: 5,
    },
  ];
  const [dataInput, setDataInput] = useState({
    question: {
      content: "",
      arrImg: [],
    },
    answers: [
      {
        answerKey: "A",
        content: "",
        arrImg: [],
        isRightAnswer: false,
      },
      {
        answerKey: "B",
        content: "",
        arrImg: [],
        isRightAnswer: false,
      },
      {
        answerKey: "C",
        content: "",
        arrImg: [],
        isRightAnswer: false,
      },
      {
        answerKey: "D",
        content: "",
        arrImg: [],
        isRightAnswer: false,
      },
    ],
  });
  const [previewVisible, setPreviewVisible] = useState({});
  const [valueSelect, setValueSelect] = useState({
    value: TYPE.QUESTION,
    type: TYPE.QUESTION,
    answerKey: "",
  });
  const [isRenderLatex, setIsRenderLatex] = useState(true);
  const [showModalUpLoadImage, setModalUploadImage] = useState(false);
  const [valueChapter, setValueChapter] = useState(
    arrChapterVsSession.Chapter[0]
  );
  const [valueSession, setValueSession] = useState(
    arrChapterVsSession.Session[0]
  );
  const [MESS_ERR, SET_MESS_ERR] = useState({
    UPLOAD_IMG: "",
  });
  const {
    editorState: [dataEditor, setDataEditor],
  } = useContext(StoreContext);

  // const {
  //   getFieldDecorator,
  //   validateFields,
  //   setFieldsValue,
  // } = props.form;
  const data = useSelectedTag(listSelectTag);
  const { renderData, selectedTag } = data;
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
  }, [dataInput, renderLatex, isRenderLatex, dataEditor]);

  const hanleQuestionContext = (value) => {
    let _value = value;
    setDataEditor({
      ...dataEditor,
      listLyThuyet: [
        ...dataEditor.listLyThuyet.slice(0, props.indexDiemLyThuyet),
        {
          ...dataEditor.listLyThuyet[props.indexDiemLyThuyet],
          listCauHoi: [
            ...dataEditor.listLyThuyet[
              props.indexDiemLyThuyet
            ].listCauHoi.slice(0, props.index),
            {
              ...dataEditor.listLyThuyet[props.indexDiemLyThuyet].listCauHoi[
                props.index
              ],
              cauHoi: _value,
            },
            ...dataEditor.listLyThuyet[
              props.indexDiemLyThuyet
            ].listCauHoi.slice(props.index + 1),
          ],
        },
        ...dataEditor.listLyThuyet.slice(props.indexDiemLyThuyet + 1),
      ],
    });
  };

  const handleAnswerContext = (answerKey, index, value) => {
    let _answerKey = answerKey;
    let _value = value;
    let _index = index;

    setDataEditor({
      ...dataEditor,
      listLyThuyet: [
        ...dataEditor.listLyThuyet.slice(0, props.indexDiemLyThuyet),
        {
          ...dataEditor.listLyThuyet[props.indexDiemLyThuyet],
          listCauHoi: [
            ...dataEditor.listLyThuyet[
              props.indexDiemLyThuyet
            ].listCauHoi.slice(0, props.index),
            {
              ...dataEditor.listLyThuyet[props.indexDiemLyThuyet].listCauHoi[
                props.index
              ],
              dapAn: [
                ...dataEditor.listLyThuyet[props.indexDiemLyThuyet].listCauHoi[
                  props.index
                ].dapAn.slice(0, _answerKey),
                `${_index}. ${_value}`,
                ...dataEditor.listLyThuyet[props.indexDiemLyThuyet].listCauHoi[
                  props.index
                ].dapAn.slice(_answerKey + 1),
              ],
            },
            ...dataEditor.listLyThuyet[
              props.indexDiemLyThuyet
            ].listCauHoi.slice(props.index + 1),
          ],
        },
        ...dataEditor.listLyThuyet.slice(props.indexDiemLyThuyet + 1),
      ],
    });
  };

  const handleInputValue = (_obj) => {
    const _dataInput = { ...dataInput } || {};
    const _type = get(_obj, "type", TYPE.QUESTION);
    const _value = get(_obj, "value", "");

    if (_type === TYPE.QUESTION) {
      _dataInput.question.content = _value;
      hanleQuestionContext(_value);
    } else {
      const answerKey = get(_obj, "answerKey", TYPE.ANSWER_KEY.A);
      const arrAnswer = get(_dataInput, "answers", []);
      const posKeyAnswer = arrAnswer.findIndex(
        (item) => get(item, `answerKey`, TYPE.ANSWER_KEY.A) === answerKey
      );

      const checkPos = posKeyAnswer >= 0 && posKeyAnswer < arrAnswer.length;
      _dataInput.answers[checkPos ? posKeyAnswer : 0].content = _value;
      handleAnswerContext(posKeyAnswer, answerKey, _value);
    }

    return setDataInput({ ..._dataInput });
  };


  const handleChoiceAnswer = (dapAnChon) => {
    let _dapAnChon = dapAnChon;

    setDataEditor({
      ...dataEditor,
      listLyThuyet: [
        ...dataEditor.listLyThuyet.slice(0, props.indexDiemLyThuyet),
        {
          ...dataEditor.listLyThuyet[props.indexDiemLyThuyet],
          listCauHoi: [
            ...dataEditor.listLyThuyet[
              props.indexDiemLyThuyet
            ].listCauHoi.slice(0, props.index),
            {
              ...dataEditor.listLyThuyet[props.indexDiemLyThuyet].listCauHoi[
                props.index
              ],
              dapAnDung: _dapAnChon,
            },
            ...dataEditor.listLyThuyet[
              props.indexDiemLyThuyet
            ].listCauHoi.slice(props.index + 1),
          ],
        },
        ...dataEditor.listLyThuyet.slice(props.indexDiemLyThuyet + 1),
      ],
    });
  };

  const onChangeChoice = (_obj) => {
    const _dataInput = { ...dataInput } || {};
    const _arrAnswer = get(_dataInput, "answers", []);
    const _answerKey = get(_obj, "answerKey", "A");
    const posKeyAnswer = _arrAnswer.findIndex(
      (item) => get(item, "answerKey", TYPE.ANSWER_KEY.A) === _answerKey
    );
    const checkPos = posKeyAnswer >= 0 && posKeyAnswer < _arrAnswer.length;

    const numberAnswer = checkPos ? posKeyAnswer : 0;

    // set toàn bộ giá trị là false
    _dataInput.answers.forEach((item) => {
      return (item.isRightAnswer = false);
    });
    const getIsRightAnswer = get(
      _dataInput,
      `answers[${numberAnswer}].isRightAnswer`,
      false
    );
    _dataInput.answers[numberAnswer].isRightAnswer = !getIsRightAnswer;

    handleChoiceAnswer(_answerKey);

    return setDataInput({ ..._dataInput });
  };

  const handlePreview = (_file) => {
    const _url = get(_file, "url", "");
    const _name = get(_file, "name", "img_math");

    return setPreviewVisible({
      url: _url,
      previewVisible: true,
      name: _name || _url.substring(_url.lastIndexOf("/") + 1),
    });
  };

  const handleCancelModalPreviewImage = () => setPreviewVisible({});

  const pushImageIntoArr = (_obj) => {
    const _dataInput = { ...dataInput };
    const _type = get(_obj, "type", TYPE.QUESTION);
    const _answerKey = get(_obj, "answerKey", "");

    const infoImg = get(_obj, "infoImg", {});

    if (_type === TYPE.QUESTION) {
      const lengthArrImg = get(_dataInput, "question.arrImg.length", 1);

      infoImg.id_img = `img_${lengthArrImg}`;

      _dataInput.question.arrImg.push(infoImg);
    } else {
      const posAnswer = _dataInput.answers.findIndex(
        (item) => item.answerKey === _answerKey
      );
      if (posAnswer === -1) {
        console.log("line: 227: pushImageIntoArr");
        return;
      }
      const lengthArrImg = get(
        _dataInput,
        `answers[${posAnswer}].arrImg.length`,
        1
      );
      infoImg.id_img = `img_${lengthArrImg}`;
      _dataInput.answers[posAnswer].arrImg.push(infoImg);
    }
    return _dataInput;
  };

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

      const _dataInput = pushImageIntoArr({
        type: _type,
        answerKey: _answerKey,
        infoImg: infoImg,
      });

      setModalUploadImage(false);
      SET_MESS_ERR({});
      return setDataInput({ ..._dataInput });
    }
  };

  const handleUpLoadImage = (_obj) => {
    const e = get(_obj, "e", {});

    e.preventDefault();
    // validateFields((err, fields) => {
    //   const _type = get(_obj, "type", TYPE.QUESTION);
    //   const _answerKey = get(_obj, "answerKey", "");
    //   const url = get(fields, "urlImage", "");
    //   const name = get(fields, "nameImg", "");
    //   if (!url || !name) return;

    //   const infoImg = {
    //     url: url,
    //     name: name,
    //   };
    //   const _dataInput = pushImageIntoArr({
    //     type: _type,
    //     answerKey: _answerKey,
    //     infoImg: infoImg
    //   })

    //   setModalUploadImage(false);
    //   // setFieldsValue({
    //   //   urlImage: "",
    //   //   nameImg: "",
    //   // });
    //   return setDataInput({ ..._dataInput });
    // });
  };

  const handleRemoveImg = (_obj) => {
    const _id_img = get(_obj, "id_img", "");
    const _type = get(_obj, "type", "");
    const _answerKey = get(_obj, "answerKey", "");
    const _dataInput = { ...dataInput };

    if (_type === TYPE.QUESTION) {
      const posImg = _dataInput.question.arrImg.findIndex(
        (item) => item.id_img === _id_img
      );
      if (posImg > -1) {
        _dataInput.question.arrImg.splice(posImg, 1);
      }
    } else {
      const posAnswer = _dataInput.answers.findIndex(
        (item) => item.answerKey === _answerKey
      );
      if (posAnswer > -1) {
        const posImg = _dataInput.answers[posAnswer].arrImg.findIndex(
          (item) => item.id_img === _id_img
        );
        if (posImg > -1) {
          _dataInput.answers[posAnswer].arrImg.splice(posImg, 1);
        }
      }
    }
    return setDataInput({ ..._dataInput });
  };
  const handleListImg = (_obj) => {
    const _arrImg = get(_obj, "arrImg", []);
    const _type = get(_obj, "type", TYPE.QUESTION);
    const _answerKey = get(_obj, "answerKey", "");
    return (
      <div className="wrap_list_img_QA">
        {_arrImg.map((item, index) => (
          <div className="wrap_img">
            <img src={get(item, "url", "")} alt={`img_math_${index}`} />
            <div className="wrap_card_preview_and_review">
              <span onClick={() => handlePreview(item)}>
                <EyeOutlined />
              </span>
              <span
                onClick={() =>
                  handleRemoveImg({
                    id_img: get(item, "id_img", ""),
                    type: _type,
                    answerKey: _answerKey,
                  })
                }
              >
                <DeleteOutlined />
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const handleDetectSelectQuestionAnswer = (e) => {
    if (e === TYPE.QUESTION) {
      setValueSelect({
        type: TYPE.QUESTION,
        value: e,
      });
    } else {
      setValueSelect({
        type: TYPE.ANSWER,
        value: e,
        answerKey: e,
      });
    }
  };

  const renderPreview = useMemo(
    () => (
      <>
        <div className="wrap_question">
          <div className="container_preview">
            <div className="content">
              <p>
                <span className="title">Question: </span>
                <span>{dataInput.question.content}</span>
              </p>
              <p className="arr_img">
                {dataInput.question.arrImg.map((item) => (
                  <img
                    src={get(item, "url", "")}
                    alt={`img_question_${get(item, "name", "")}`}
                  />
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className="wrap_answer">
          <div className="container_preview">
            {dataInput.answers.map((item, index) => (
              <div
                className={`item_answer ${
                  item.isRightAnswer && "is_right_answer"
                }`}
                key={item.answerKey}
              >
                <div className="content">
                  <p>
                    <span className="title">Answer {item.answerKey}:</span>
                    <span>{get(item, "content", "")}</span>
                  </p>
                  <p className="arr_img">
                    {item?.arrImg?.map((item) => (
                      <img
                        src={get(item, "url", "")}
                        alt={`img_question_${get(item, "name", "")}`}
                      />
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="wrap_giai_thich">
          <p>
            Giải Thích:{" "}
            {get(
              dataEditor,
              `listLyThuyet[${props.indexDiemLyThuyet}].listCauHoi[${props.index}].giaiThich`,
              ""
            )}
          </p>
        </div>
      </>
    ),
    [dataInput, dataEditor]
  );
  const RenderSelectPositionToUpLoad = useMemo(
    () => (
      <div className="wrap_header_modal_select">
        <div>Upload Image for</div>
        <Select
          value={get(valueSelect, "value", TYPE.QUESTION)}
          onChange={(e) => handleDetectSelectQuestionAnswer(e)}
        >
          <Select.Option value={TYPE.QUESTION}>Question</Select.Option>
          {dataInput.answers.map((item, index) => (
            <Select.Option
              className="option_select_answer"
              key={index}
              value={item.answerKey}
            >
              Answer {item.answerKey}
            </Select.Option>
          ))}
        </Select>
      </div>
    ),
    [valueSelect, dataInput]
  );

  const totalModal = () => (
    <>
      <Modal
        visible={get(previewVisible, "previewVisible", false)}
        title={get(previewVisible, "name", "")}
        footer={null}
        onCancel={handleCancelModalPreviewImage}
        width="550px"
        height="550px"
        style={{ top: 20 }}
      >
        <img
          alt="example"
          style={{ width: "500px", height: "500px", objectFit: "cover" }}
          src={get(previewVisible, "url", "")}
        />
      </Modal>

      <Modal
        onCancel={() => {
          setModalUploadImage(false);
          SET_MESS_ERR((state) => (state.UPLOAD_IMG = ""));
        }}
        visible={showModalUpLoadImage}
        footer={false}
        title={RenderSelectPositionToUpLoad}
      >
        <div className="err_mess_page_editor">{MESS_ERR.UPLOAD_IMG}</div>

        <div className="wrap_content_modal_upload">
          <Upload
            listType="picture-card"
            showUploadList={false}
            onChange={(e) =>
              e.fileList.length > 0 &&
              e.file.status !== "uploading" &&
              uploadImage({
                files: e,
                type: get(valueSelect, "type", TYPE.QUESTION),
                answerKey: get(valueSelect, "answerKey", TYPE.ANSWER_KEY.A),
              })
            }
            beforeUpload={() => false}
          >
            Upload
          </Upload>

          <Form className="wrap_input_link_img">
            <Form.Item label="Link Image">
              <Input id="urlImage" placeholder="Input Your Link Imgage" />
            </Form.Item>
            <Form.Item label="Name Image">
              <Input id="nameImg" placeholder="Input Your Name Imgage" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={(e) =>
                  handleUpLoadImage({
                    e,
                    type: get(valueSelect, "type", TYPE.QUESTION),
                    answerKey: get(valueSelect, "answerKey", ""),
                  })
                }
              >
                OK
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
  const renderInputAnswer = useMemo(
    () => (
      <Radio.Group>
        {dataInput.answers.map((item, index) => {
          const answerKey = get(item, "answerKey", TYPE.ANSWER_KEY.A);
          const content = get(item, "content", "");
          const arrImg = get(item, "arrImg", []);
          const isRightAnswer = get(item, "isRightAnswer", false);
          return (
            <div className="wrap_editor_checkbox">
              <div className="wrap_editor_answer">
                <Input.TextArea
                  key={answerKey}
                  placeholder={`enter your answer ${answerKey}`}
                  value={content}
                  onChange={(e) =>
                    handleInputValue({
                      value: get(e, "currentTarget.value", ""),
                      type: TYPE.ANSWER,
                      answerKey: answerKey,
                    })
                  }
                />
                {arrImg.length > 0 &&
                  handleListImg({
                    arrImg: arrImg,
                    type: TYPE.ANSWER,
                    answerKey: answerKey,
                  })}
              </div>
              <Radio
                value={index}
                key={index}
                checked={isRightAnswer}
                onClick={() =>
                  onChangeChoice({
                    answerKey: answerKey,
                  })
                }
              />
            </div>
          );
        })}
      </Radio.Group>
    ),
    [dataInput]
  );

  const handleGiaiThichChange = (e) => {
    setDataEditor({
      ...dataEditor,
      listLyThuyet: [
        ...dataEditor.listLyThuyet.slice(0, props.indexDiemLyThuyet),
        {
          ...dataEditor.listLyThuyet[props.indexDiemLyThuyet],
          listCauHoi: [
            ...dataEditor.listLyThuyet[
              props.indexDiemLyThuyet
            ].listCauHoi.slice(0, props.index),
            {
              ...dataEditor.listLyThuyet[props.indexDiemLyThuyet].listCauHoi[
                props.index
              ],
              giaiThich: e.target.value,
            },
            ...dataEditor.listLyThuyet[
              props.indexDiemLyThuyet
            ].listCauHoi.slice(props.index + 1),
          ],
        },
        ...dataEditor.listLyThuyet.slice(props.indexDiemLyThuyet + 1),
      ],
    });
  };

  return (
    <div className="wrap_layout_create_question">
      <div className="wrap_layout_create_question__container">
        <div className="wrap_editor_preview">
          <div className="wrap_editor">
            <div className="question">
              <Input.TextArea
                value={dataInput.question.content}
                onChange={(e) =>
                  handleInputValue({
                    value: e.currentTarget.value,
                    type: TYPE.QUESTION,
                  })
                }
              />

              {dataInput.question.arrImg.length > 0 &&
                handleListImg({
                  arrImg: dataInput.question.arrImg,
                  type: TYPE.QUESTION,
                })}
            </div>
            <div className="answer">{renderInputAnswer}</div>
            <div className="giaiThich">
              <h5>Giải Thích</h5>
              <Input.TextArea
                value={get(
                  dataEditor,
                  `listLyThuyet[${props.indexDiemLyThuyet}].listCauHoi[${props.index}].giaiThich`,
                  ""
                )}
                onChange={handleGiaiThichChange}
              />
            </div>
          </div>
          <div className="wrap_preview_question">
            <div className="wrap_preview">
              <Question
                cauHoi={get(
                  dataEditor,
                  `listLyThuyet[${props.indexDiemLyThuyet}].listCauHoi[${props.index}].cauHoi`,
                  ""
                )}
                dapAn={get(
                  dataEditor,
                  `listLyThuyet[${props.indexDiemLyThuyet}].listCauHoi[${props.index}].dapAn`,
                  []
                )}
                dapAnDung={get(
                  dataEditor,
                  `listLyThuyet[${props.indexDiemLyThuyet}].listCauHoi[${props.index}].dapAnDung`,
                  "A"
                )}
                giaiThich={get(
                  dataEditor,
                  `listLyThuyet[${props.indexDiemLyThuyet}].listCauHoi[${props.index}].giaiThich`,
                  ""
                )}
              />
            </div>
            <div className="wrap_list_info_create">
              <div className="wrap_upload_img">
                <Button onClick={() => setModalUploadImage(true)}>
                  Upload Image
                </Button>
              </div>
            </div>
          </div>
        </div>

        {totalModal()}
      </div>
    </div>
  );
};

export default Editor;
