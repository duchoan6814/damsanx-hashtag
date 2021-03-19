import React, { useState, useEffect, useContext } from "react";
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

const DisplayBody = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [path, setPath] = useState("");
  const { data: [ data, setData ] } = useContext(StoreContext);

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

  const actionButtonSau = () => {
    setCurrentPage(currentPage + 1);
  };

  const actionButtonTruoc = () => {
    setCurrentPage(currentPage - 1);
  };

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
