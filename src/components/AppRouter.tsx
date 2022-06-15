import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { $CombinedState } from "redux";
import { useTypedSelector } from "../hooks/useTypedSelectror";
//import { privateRoutes, publicRoutes, RouteNames } from "../router";
import { privateRoutes, publicRoutes } from "../router";
import { RouteNames } from "../router/routeNames";
import MyLayout from "./MyLayout";
import MySider from "./UI/MySider";

/*роутер*/

const AppRouter = () => {
  // получение флага авторизации
  const isAuth = useTypedSelector((state) => state.auth.isAuth);

  return isAuth ? (
    <>
      {" "}
      <MySider></MySider>
      <Routes>
        <Route>
          {privateRoutes.map((route) => (
            <Route
              path={route.path}
              element={<route.element />}
              key={route.path}
            />
          ))}
        </Route>

        <Route path="*" element={<Navigate to={RouteNames.FIRST} replace />} />
      </Routes>
    </>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route path={route.path} element={<route.element />} key={route.path} />
      ))}
      <Route path="*" element={<Navigate to={RouteNames.LOGIN} replace />} />
    </Routes>
  );
};

export default AppRouter;
