import { Button, Checkbox, Form, Input, Typography } from "antd";
import React, { Dispatch, FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelectror";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";

/* Форма для входа*/

const LoginForm: FC = () => {
  const { login } = useActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading } = useTypedSelector((state) => state.auth);

  // вход в случае успешного заполения формы
  const onFinish = () => {
    login(email, password);
  };

  //в случае ошибки
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {error && (
        <Typography.Text style={{ margin: 15, color: "red" }}>
          {error}
        </Typography.Text>
      )}
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item rules={[{ required: true, message: "Введите логин" }]}>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Логин или email"
          />
        </Form.Item>

        <Form.Item rules={[{ required: true, message: "Введите пароль" }]}>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Пароль"
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" loading={isLoading} htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
