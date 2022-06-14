import { Col, Layout, Row, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import MySider from "./UI/MySider";

const MyLayout: FC = () => {
  return (
    <Layout hasSider>
      <MySider />
      <Layout
        className="site-layout"
        style={{
          marginLeft: 300,
        }}
      >
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default MyLayout;
