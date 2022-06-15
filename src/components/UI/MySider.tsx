import React, { Dispatch, useEffect, useState } from "react";
import {
  UserOutlined,
  ProfileOutlined,
  FileDoneOutlined,
  CalendarOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Layout, Slider, Menu, Badge } from "antd";
import Sider from "antd/lib/layout/Sider";
//import { getButtonsMenu } from "../../data/buttonsData";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "../../store/reducers/auth/action-creators";
import { useTypedSelector } from "../../hooks/useTypedSelectror";
import { IUser } from "../../models/IUser";
import { IMenuButton } from "../../models/IMenuButton";
import { useActions } from "../../hooks/useActions";
import { Link, NavLink } from "react-router-dom";
import { RouteNames } from "../../router/routeNames";
//import { RouteNames } from "../../router";
//import { menuButtons } from "../../data/menuData";
import { getButtonsMenu } from "../../data/buttonsData";

// боковая панель

type Props = {};

/*<Menu.Item key="tasks" icon={<ProfileOutlined />}>
          <NavLink to={RouteNames.TASKS}>
            Задания
            </NavLink>
        </Menu.Item>

        <Menu.Item key="settings" icon={<ProfileOutlined />}>
          <NavLink to={RouteNames.SETTINGS}>
            Настройки
            </NavLink>
        </Menu.Item>*/

/*      
        <Menu.Item key="tasks" icon={<ProfileOutlined />}>
          <NavLink to={RouteNames.TASKS}>Задания</NavLink>
        </Menu.Item>

        <Menu.Item key="settings" icon={<ProfileOutlined />}>
          <NavLink to={RouteNames.SETTINGS}>Настройки</NavLink>
        </Menu.Item>
       */

export default function MySider(props: Props) {
  const dispatch: Dispatch<any> = useDispatch();

  const user: IUser = useTypedSelector((state) => state.auth.user);

  const [buttonsArr, setTest] = useState<IMenuButton[]>(getButtonsMenu(user));
  // let buttonsArr: IMenuButton[] = [...getButtonsMenu(user)];
  console.log(buttonsArr);

  const { logout } = useActions();

  return (
    <Sider
      width={300}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Menu theme="dark" mode="inline">
        {buttonsArr.map((b) =>
          b.isBadge ? (
            <Menu.Item key={b.key} icon={<b.icon />}>
              {<Link to={b.link}>{b.label}</Link>}

              <Badge count={5} offset={[150, -2]}></Badge>
            </Menu.Item>
          ) : (
            <Menu.Item key={b.key} icon={<b.icon />}>
              {<Link to={b.link}>{b.label}</Link>}
            </Menu.Item>
          )
        )}
        <Menu.Item
          key="logout"
          icon={<PoweroffOutlined />}
          onClick={() => {
            logout();
            setTest([]);
          }}
        >
          Выйти
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
