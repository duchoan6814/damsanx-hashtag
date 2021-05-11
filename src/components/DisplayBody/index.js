import React, { useState, useEffect, useContext, useCallback } from "react";
import { Layout, Menu, Button, Carousel, Input } from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";
import Tag from "../../components/commons/tags";
import ContentBody from "../../components/contentBody";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
// import data from "./mockData/date.json";
import { convertSlug } from "../../common/helper";

import "../../App.css";
import "../../App.scss";
import { StoreContext } from "../../Context";

let timeOut = 0;

const DisplayBody = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isRenderLatex, setIsRenderLatex] = useState(true);
  const [path, setPath] = useState("");
  const { data: [ data, setData ] } = useContext(StoreContext);

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
  }, [renderLatex, isRenderLatex, path]);

  useEffect(() => {
    setCurrentPage(1);
  }, [path]);

  const renderHashtag = () =>
    data.map((item, index) => (
      <Link
        onClick={() => setPath(convertSlug(item.hashtag))}
        to={`/hashtag/${convertSlug(item.hashtag)}?page=1`}
      >
        <Tag content={`#${item.hashtag}`} select={index === 0} />
      </Link>
    ));

  return (
    <>
      <div className="header-of-content">
        <div className="left-site">
          <Button icon={<ArrowLeftOutlined />}>Quay lại</Button>
        </div>
        <div className="right-site">
          <h3>Sự tiếp xúc - Tiếp tuyến của đồ thị hàm số</h3>
          <p>
            Chương: Ứng dụng đạo hàm để khảo sát đồ thị hàm số &#x220E; Lớp 12
          </p>
        </div>
      </div>
      <div className="list-tag">{renderHashtag()}</div>
      <div className="site-layout-content">
        <Switch>
          <Route path="/hashtag/:slug">
            <ContentBody />
          </Route>
          <Route path="/hashtag">
            <ContentBody data={data} />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default DisplayBody;