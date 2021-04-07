import React, { useState, useEffect, useCallback, useContext } from "react";
import Latex from "react-latex";
import "./question.scss";
import { Radio, Col, Button } from "antd";

const Question = (props) => {
  const { cauHoi, dapAn, dapAnDung, giaiThich } = props;
  const [ketQua, setKetQua] = useState("");
  const [dapAnChon, setDapAnChon] = useState({});
  const [classKetQua, setClassKetQua] = useState("");
  const [displayClass, setDisplayClass] = useState("none");

  useEffect(() => {
    setClassKetQua("");
    setKetQua("");
    setDisplayClass("none");
  }, [cauHoi]);

  const radioButtonChange = (e) => {
    setClassKetQua("");
    setKetQua("");
    setDisplayClass("none");
    if (e.target.value === 0) {
      return setDapAnChon({
        index: 0,
        value: "A",
      });
    }
    if (e.target.value === 1) {
      return setDapAnChon({
        index: 1,
        value: "B",
      });
    }
    if (e.target.value === 2) {
      return setDapAnChon({
        index: 2,
        value: "C",
      });
    }
    if (e.target.value === 3) {
      return setDapAnChon({
        index: 3,
        value: "D",
      });
    }
  };

  const actionButtonKiemTra = () => {
    if (dapAnChon.value === undefined) {
      setKetQua("Vui lòng chọn đáp án.");
    } else if (dapAnChon.value === dapAnDung) {
      setClassKetQua("dung");
      setKetQua("Chính xác");
      setDisplayClass("");
    } else {
      setClassKetQua("sai");
      setKetQua("Sai rồi");
    }
  };

  const actionButtonCachGiai = () => {
    setDisplayClass("");
  };

  const renderDapAn = () => {
    return dapAn.map((item, index) => {
      return dapAnChon.index === index ? (
        <Radio className={`${classKetQua}`} value={index}>
          {item}
        </Radio>
      ) : (
        <Radio value={index}>{item}</Radio>
      );
    });
  };

  return (
    <div className="container-question">
      <p>{cauHoi}</p>
      <Radio.Group onChange={radioButtonChange} name="radiogroup">
        {renderDapAn()}
      </Radio.Group>
      <div className="button-dap-an">
        <Button onClick={actionButtonCachGiai}>Cách Giải</Button>
        <Button onClick={actionButtonKiemTra} type="primary">
          Kiểm Tra
        </Button>
        <p>{ketQua}</p>
      </div>
      <div className={`${displayClass} giai-thich`}>
        <p>{giaiThich}</p>
      </div>
    </div>
  );
};

export default Question;
