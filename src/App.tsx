import React, { FC, useEffect } from "react";

import "./App.css";
import AppRouter from "./components/AppRouter";
import { useActions } from "./hooks/useActions";
import { IUser } from "./models/IUser";
import { ConfigProvider } from "antd";

import moment from "moment";
import "moment/locale/ru";

import ru_RU from "antd/lib/locale-provider/ru_RU";

const App: FC = () => {
  const { setAuth, setUser } = useActions();
  moment.locale("ru");

  useEffect(() => {
    // временно, изменить на проверку токена

    if (localStorage.getItem("auth")) {
      setUser({
        email: localStorage.getItem("email") || "",
        roles: localStorage.getItem("roles")?.split(" ") || [],
        places: JSON.parse(localStorage.getItem("places") || "[]"),
        //   places: localStorage.getItem("places")?.split(", ") || [],
        fio: localStorage.getItem("fio") || "",
      } as IUser);
      setAuth(true);
    }
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
