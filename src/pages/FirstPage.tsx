import { Col, Layout, Row, Segmented, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { FC } from "react";
import MySider from "../components/UI/MySider";

const FirstPage: FC = () => {
  return (
    <Layout className="site-layout layout_m-300">
      <Content
        style={{
          margin: "24px 16px 0",
          overflow: "initial",
        }}
      >
        <Row align="middle" justify="center" style={{ height: "100vh" }}>
          <Col>
            <Typography.Title level={4}>
              Добро пожаловать в систему !!!!!
            </Typography.Title>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default FirstPage;
