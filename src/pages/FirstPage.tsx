import { Col, Layout, Row, Segmented, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { FC } from "react";
import MySider from "../components/UI/MySider";

const FirstPage: FC = () => {
  return (
    <Layout hasSider>
      <MySider />
      <Layout
        className="site-layout"
        style={{
          marginLeft: 300,
        }}
      >
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
    </Layout>
  );
};

export default FirstPage;
