import React, { FC, useEffect } from "react";

import "./App.css";
import AppRouter from "./components/routers/AppRouter";
import { useActions } from "./hooks/useActions";
import { IUser } from "./models/IUser";
import { ConfigProvider, message } from "antd";

import moment from "moment";
import "moment/locale/ru";

import ru_RU from "antd/lib/locale-provider/ru_RU";

import jwt_decode from "jwt-decode";

const App: FC = () => {
  const { setAuth, setUser, setError, checkAuth } = useActions();
  moment.locale("ru");

  useEffect(() => {
    if (!checkAuth()) {
      message.error("Произошла ошибка авторизации. Повторите попытку");
    }
    // if (localStorage.getItem("token")) {
    //   try {
    //     const user = jwt_decode(localStorage.getItem("token") || "");
    //     setUser(user as IUser);
    //     setAuth(true);
    //   } catch (e) {
    //     setError(
    //       "Время вашей сессии истекло. Пожалуйста, авторизуйтесь повторно"
    //     );
    //     message.error("Произошла ошибка авторизации. Повторите попытку");
    //   }
    // }
  }, []);

  return (
    <div className="App">
      <ConfigProvider locale={ru_RU}>
        <AppRouter />
      </ConfigProvider>
    </div>
  );
};

export default App;
