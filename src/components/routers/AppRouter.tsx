import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { $CombinedState } from "redux";
import { useTypedSelector } from "../../hooks/useTypedSelectror";
//import { privateRoutes, publicRoutes, RouteNames } from "../router";
import { privateRoutes, publicRoutes } from "../../router";
import { RouteNames } from "../../router/routeNames";
import MySider from "../navigation/MySider";

/*роутер*/

const AppRouter = () => {
  // получение флага авторизации
  const { isAuth, isLoading } = useTypedSelector((state) => state.auth);

  return isAuth ? (
    <>
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
          <Route
            path="*"
            element={<Navigate to={RouteNames.FIRST} replace />}
          />
        </Route>
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
