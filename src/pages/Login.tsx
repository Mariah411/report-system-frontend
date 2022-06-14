import {
  Form,
  Input,
  Checkbox,
  Button,
  Row,
  Col,
  Typography,
  Card,
} from "antd";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import LoginForm from "../components/LoginForm";
import { useTypedSelector } from "../hooks/useTypedSelectror";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";

/*страница логина*/
const Login: FC = () => {
  return (
    <Row
      style={{
        height: "100vh",
      }}
      justify="center"
      align="middle"
    >
      <Col span={6}>
        <Card>
          <Typography.Title
            level={2}
            style={{ margin: 15, textAlign: "center" }}
          >
            Вход в систему
          </Typography.Title>
          <LoginForm />
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
