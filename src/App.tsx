import React, { FC, useEffect } from "react";

import "./App.css";
import AppRouter from "./components/AppRouter";
import { useActions } from "./hooks/useActions";
import { IUser } from "./models/IUser";
import { ConfigProvider, message } from "antd";

import moment from "moment";
import "moment/locale/ru";

import ru_RU from "antd/lib/locale-provider/ru_RU";

import jwt_decode from "jwt-decode";

const App: FC = () => {
  const { setAuth, setUser, setError } = useActions();
  moment.locale("ru");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      try {
        const user = jwt_decode(localStorage.getItem("token") || "");
        setUser(user as IUser);
        setAuth(true);
      } catch (e) {
        setError(
          "Время вашей сессии истекло. Пожалуйста, авторизуйтесь повторно"
        );
        message.error("Произошла ошибка авторизации. Повторите попытку");
      }
    }
    // временно, изменить на проверку токена
    // if (localStorage.getItem("auth")) {
    //   setUser({
    //     email: localStorage.getItem("email") || "",
    //     roles: localStorage.getItem("roles")?.split(" ") || [],
    //     places: JSON.parse(localStorage.getItem("places") || "[]"),
    //     //   places: localStorage.getItem("places")?.split(", ") || [],
    //     fio: localStorage.getItem("fio") || "",
    //   } as IUser);
    //   setAuth(true);
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
