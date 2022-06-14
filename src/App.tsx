import React, { FC, useEffect } from "react";

import "./App.css";
import AppRouter from "./components/AppRouter";
import { useActions } from "./hooks/useActions";
import { IUser } from "./models/IUser";

const App: FC = () => {
  const { setAuth, setUser } = useActions();

  useEffect(() => {
    // временно, изменить на проверку токена

    if (localStorage.getItem("auth")) {
      setUser({
        email: localStorage.getItem("email") || "",
        roles: localStorage.getItem("roles")?.split(" ") || [],
        places: localStorage.getItem("places")?.split(", ") || [],
        fio: localStorage.getItem("fio") || "",
      } as IUser);
      setAuth(true);
    }
  }, []);

  return (
    <div className="App">
      
      <AppRouter />
    </div>
  );
};

export default App;
