import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { settingsRoutes } from "../../router";
import { settingsRouteNames } from "../../router/settingsRouteNames";
import SettingsMenu from "../navigation/SettingsMenu";

const SettingsRouter: FC = () => {
  return (
    <>
      <SettingsMenu />
      <Routes>
        {settingsRoutes.map((route) => (
          <Route
            path={route.path}
            element={<route.element />}
            key={route.path}
          />
        ))}
        <Route
          path="*"
          element={<Navigate to={settingsRouteNames.USERS} replace />}
        />
      </Routes>
    </>
  );
};

export default SettingsRouter;
