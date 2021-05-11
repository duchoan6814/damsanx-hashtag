import React, { useState, useEffect, useContext } from "react";
import { Layout, Menu, Button, Carousel, Input } from "antd";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { get } from "lodash";

import { convertSlug } from "../../common/helper";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  Redirect,
} from "react-router-dom";

import EditorComponent from "../EditQuestion";
import EditorLyThuyet from "../EditorLyThuyetPro";
import "./EditorBody.scss";
import { StoreContext } from "../../Context";

const EditorBody = () => {
  const {
    editorState: [dataEditor, setDataEditor],
    data: [data, setData],
  } = useContext(StoreContext);

  const handleButtonThemDiemLyThuyet = (index) => {
    setDataEditor({
      ...dataEditor,
      listLyThuyet: [
        ...dataEditor.listLyThuyet,
        {
          noiDung: "",
          viDu: "",
          listCauHoi: [
            {
              cauHoi: "",
              dapAn: [],
              dapAnDung: "A",
              giaiThich: "",
            },
          ],
        },
        // ...dataEditor.listLyThuyet.slice(index + 1),
      ],
    });
  };

  const handleButtonThemCauHoi = (index) => {
    const _index = index;
    setDataEditor({
      ...dataEditor,
      listLyThuyet: [
        ...dataEditor?.listLyThuyet?.slice(0, index),
        {
          ...dataEditor?.listLyThuyet[index],
          listCauHoi: [
            ...dataEditor?.listLyThuyet[index].listCauHoi,
            {
              cauHoi: "",
              dapAn: [],
              dapAnDung: "A",
              giaiThich: "",
            },
          ],
        },
        ...dataEditor?.listLyThuyet?.slice(index + 1),
      ],
    });
  };

  const onChangeHashTagName = (e) => {
    setDataEditor({
      ...dataEditor,
      hashtag: e.target.value,
    });
  };

  const handleButtonPreview = () => {
    setData([...data, dataEditor]);

    setDataEditor({
      hashtag: "",
      listLyThuyet: [
        {
          noiDung: {
            text: "",
            listText: [],
            image: [],
          },
          viDu: "",
          listCauHoi: [
            {
              cauHoi: "",
              dapAn: [],
              dapAnDung: "A",
              giaiThich: "",
            },
          ],
        },
      ],
    });
  };

  return (
    <>
      <div className="wrap_header_of_body">
        <div className="top_side">
          <h2>Hashtag Name</h2>
          <Button onClick={() => handleButtonPreview()} icon={<EyeOutlined />}>
            <Link to={`/hashtag/${convertSlug(dataEditor.hashtag)}?page=1`}>
              Preview
            </Link>
          </Button>
        </div>
        <Input onChange={onChangeHashTagName} placeholder="hashtag name..." />
      </div>

      {get(dataEditor, "listLyThuyet", []).map((item, index) => {
        return (
          <div className="wrap_list_diem_ly_thuyet">
            <EditorLyThuyet key={index} index={index} />
            <div className="wrap_list_cau_tra_loi">
              {get(dataEditor, `listLyThuyet[${index}].listCauHoi`, []).map(
                (item, index2) => {
                  return (
                    <EditorComponent
                      key={index2}
                      indexDiemLyThuyet={index}
                      index={index2}
                    />
                  );
                }
              )}
              <Button
                className="button_them_cau_hoi"
                onClick={() => handleButtonThemCauHoi(index)}
                icon={<PlusOutlined />}
              >
                Thêm Câu Hỏi
              </Button>
            </div>
            <Button
              onClick={() => handleButtonThemDiemLyThuyet(index)}
              icon={<PlusOutlined />}
              className="button_them_diem_ly_thuyet"
            >
              Thêm điểm lý thuyết
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default EditorBody;
