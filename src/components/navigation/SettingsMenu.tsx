import { Menu, MenuProps } from "antd";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { settingsRouteNames } from "../../router/settingsRouteNames";

const SettingsMenu: FC = () => {
  const items: MenuProps["items"] = [
    {
      key: "users",
      label: (
        <NavLink to={settingsRouteNames.USERS}>Пользователи системы</NavLink>
      ),
    },
    {
      key: "schools",
      label: <NavLink to={settingsRouteNames.SCHOOLS}>Учреждения ДО</NavLink>,
    },
    {
      key: "areas",
      label: <NavLink to={settingsRouteNames.AREAS}>Районы</NavLink>,
    },
    {
      key: "directions",
      label: (
        <NavLink to={settingsRouteNames.DIRECTIONS}>
          Направления обучения
        </NavLink>
      ),
    },
  ];

  return (
    <Menu items={items} mode="horizontal" defaultSelectedKeys={["users"]} />
  );
};

export default SettingsMenu;
