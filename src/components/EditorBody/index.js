import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Carousel, Input } from "antd";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { get } from "lodash";

import EditorComponent from "../EditQuestion";
import EditorLyThuyet from "../EditorLyThuyet";
import "./EditorBody.scss";

const EditorBody = () => {
  const [dataEditor, setDataEditor] = useState({
    hashtagName: "",
    listDiemLyThuyet: [
      {
        lyThuyet: "",
        listCauHoi: [
          {
            cuaHoi: "",
            listDapAn: [],
            dapAnDung: 0,
          }
        ],
      },
    ],
  });

  const handleButtonThemDiemLyThuyet = () => {
    setDataEditor({
      ...dataEditor,
      listDiemLyThuyet: [
        ...dataEditor.listDiemLyThuyet,
        {
          lyThuyet: "",
          listCauHoi: [
            {
              cuaHoi: "",
              listDapAn: [],
              dapAnDung: 0,
            }
          ],
        },
      ],
    });
  };

  const handleButtonThemCauHoi = (index) => {
    const _index = index;
    setDataEditor({
      ...dataEditor,
      listDiemLyThuyet: [
        ...dataEditor?.listDiemLyThuyet?.slice(0, index),
        {
          ...dataEditor?.listDiemLyThuyet[index],
          listCauHoi: [
            ...dataEditor?.listDiemLyThuyet[index].listCauHoi,
            { cuaHoi: "", listDapAn: [], dapAnDung: 0 },
          ],
        },
        ...dataEditor?.listDiemLyThuyet?.slice(index + 1),
      ],
    });
  };

  console.log(dataEditor);

  return (
    <>
      <div className="wrap_header_of_body">
        <div className="top_side">
          <h2>Hashtag Name</h2>
          <Button
            onClick={() => handleButtonThemDiemLyThuyet()}
            icon={<PlusOutlined />}
          >
            Thêm điểm lý thuyết
          </Button>
        </div>
        <Input placeholder="hashtag name..." />
      </div>

      {get(dataEditor, "listDiemLyThuyet", []).map((item, index) => {
        return (
          <div className="wrap_list_diem_ly_thuyet">
            <EditorLyThuyet />
            <div className="wrap_list_cau_tra_loi">
              {get(dataEditor, `listDiemLyThuyet[${index}].listCauHoi`, []).map(
                (item, index) => {
                  return <EditorComponent key={index} />;
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
          </div>
        );
      })}

      {/* <div className="wrap_list_diem_ly_thuyet">
        <EditorLyThuyet />
        <div className="wrap_list_cau_tra_loi">
          {get(dataEditor, "listDiemLyThuyet[0].listCauHoi", []).map(
            (item, index) => {
              return <EditorComponent key={index} />;
            }
          )}
          <Button
            className="button_them_cau_hoi"
            onClick={() => handleButtonThemCauHoi(0)}
            icon={<PlusOutlined />}
          >
            Thêm Câu Hỏi
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default EditorBody;
