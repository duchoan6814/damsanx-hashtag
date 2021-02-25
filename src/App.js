import React, { useState, useEffect } from "react";
import logo from "./assets/svg/logo.svg";
import { Layout, Menu, Button, Carousel } from "antd";
import "./App.css";
import "./App.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Tag from "./components/commons/tags";
import ContentBody from "./components/contentBody";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import data from "./mockData/date.json";
import { convertSlug } from "./common/helper";

const { Header, Content, Footer } = Layout;

function App(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [path, setPath] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [path]);

  const renderHashtag = () =>
    data.map((item, index) => (
      <Link
        onClick={() => setPath(convertSlug(item.hashtag))}
        to={`/${convertSlug(item.hashtag)}?page=1`}
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
    <Layout className="layout">
      <Header>
        <img src={logo} className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">Nhà Chính</Menu.Item>
          <Menu.Item key="2">Luyện Thi</Menu.Item>
          <Menu.Item key="3">Đóng Góp</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "20px 50px", backgroundColor: "#FFDE96" }}>
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
            <Route path="/:slug">
              <ContentBody data={data} />
            </Route>
            <Route path="/">
              <ContentBody data={data} />
            </Route>
          </Switch>
          <div className="two-button">
            <Link
              onClick={actionButtonTruoc}
              to={`${props.location.pathname}?page=${currentPage - 1}`}
            >
              <Button type="primary">Trước</Button>
            </Link>

            <Link
              onClick={actionButtonSau}
              to={`${props.location.pathname}?page=${currentPage + 1}`}
            >
              <Button type="primary">Sau</Button>
            </Link>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default withRouter(App);
