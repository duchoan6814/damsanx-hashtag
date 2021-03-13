import React, { useState, useEffect } from "react";
import logo from "./assets/svg/logo.svg";
import { Layout, Menu, Button, Carousel, Input } from "antd";
import "./App.css";
import "./App.scss";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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

import { get } from "lodash";
import EditorBody from "./components/EditorBody";

import DisplayBody from "./components/DisplayBody";

const { Header, Content, Footer } = Layout;

function App(props) {
  return (
    <Layout className="layout">
      <Header>
        <img src={logo} className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1"><Link to="/">Nhà Chính</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/editor">Editor</Link></Menu.Item>
          {/* <Menu.Item key="3">Đóng Góp</Menu.Item>  */}
        </Menu>
      </Header>
      <Content style={{ padding: "20px 50px", backgroundColor: "#FFDE96" }}>
        <Switch>
          <Route path="/" exact>
            <DisplayBody />
          </Route>
          <Route path="/:slug">
            <DisplayBody {...props} />
          </Route>
          <Route path="/editor">
            <EditorBody />
          </Route>
        </Switch>
        {/* <EditorBody /> */}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default withRouter(App);
