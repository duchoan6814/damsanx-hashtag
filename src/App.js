import React from "react";
import logo from './assets/svg/logo.svg';
import { Layout, Menu, Button } from "antd";
import './App.css';
import './App.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;

function App() {
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
      <Content style={{ padding: "20px 50px", backgroundColor: '#FFDE96' }}>
        <div className="header-of-content">
          <div className="left-site">
            <Button icon={ <ArrowLeftOutlined />}>Quay lại</Button>
          </div>
          <div className="right-site">
            <h3>Sự tiếp xúc - Tiếp tuyến của đồ thị hàm số</h3>
            <p>Chương: Ứng dụng đạo hàm để khảo sát đồ thị hàm số &#x220E; Lớp 12</p>
          </div>
        </div>
        <div className="site-layout-content">Content</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
