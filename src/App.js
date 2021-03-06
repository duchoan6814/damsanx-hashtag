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
  Redirect
} from "react-router-dom";
import data from "./mockData/date.json";
import { convertSlug } from "./common/helper";

import { get } from "lodash";
import EditorBody from "./components/EditorBody";
import EditorBodyPro from './components/EditorBodyPro';

import DisplayBody from "./components/DisplayBody";

const { Header, Content, Footer } = Layout;

function App(props) {
  return (
    <Layout className="layout">
      <Header>
        <img src={logo} className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1"><Link to="/hashtag">Nhà Chính</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/editor">Editor</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/editor-pro">Editor Pro Ver</Link></Menu.Item>
          {/* <Menu.Item key="3">Đóng Góp</Menu.Item>  */}
        </Menu>
      </Header>
      <Content style={{ padding: "20px 50px", backgroundColor: "#FFDE96" }}>
        <Switch>
          <Redirect from="/" to="/hashtag" exact/>
          <Route path="/hashtag" exact>
            <DisplayBody {...props} />
          </Route>
          <Route path="/hashtag/:slug" exact>
            <DisplayBody {...props} />
          </Route>
          <Route path="/editor">
            <EditorBody />
          </Route>
          <Route path="/editor-pro">
            <EditorBodyPro />
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
