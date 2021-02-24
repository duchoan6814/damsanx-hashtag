import React from "react";
import Latex from "react-latex";
import "./question.scss";
import { Radio, Col, Button } from "antd";

const Question = () => {
  return (
    <div className="container-question">
      <Latex>
        Cắt khối cầu $(S)$ bởi mặt phẳng đi qua tâm của nó ta được hình tròn có
        diện tích bằng $4\pi a^2$. Thể tích của khối cầu $(S)$ bằng
      </Latex>
      <Radio.Group name="radiogroup">
        <Radio value={1}>A. <Latex>{'$P_{\min}=\dfrac{18\sqrt{11}-29}{9}$'}</Latex></Radio>
        <Radio value={2}>B. <Latex>{'$P_{\min}=\dfrac{9\sqrt{11}-19}{9}$'}</Latex></Radio>
        <Radio value={3}><Latex>{`C. $P_{\min}=\dfrac{9\sqrt{11}+19}{9}$`}</Latex></Radio>
        <Radio value={4}><Latex>{`D. $P_{\min}=\dfrac{2\sqrt{11}-3}{3}$`}</Latex></Radio>
      </Radio.Group>
      <div className="button-dap-an">
        <Button>Cách Giải</Button>
        <Button type="primary">Kiểm Tra</Button>
      </div>
      <Latex>Giai thich</Latex>
    </div>
  );
};

export default Question;
