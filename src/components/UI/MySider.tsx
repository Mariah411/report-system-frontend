import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { getButtonsMenu } from "../../data/buttonsData";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelectror";
import { IMenuButton } from "../../models/IMenuButton";
import { IUser } from "../../models/IUser";
import { RouteNames } from "../../router/routeNames";
import MenuCard from "./menuCard/MenuCard";

// боковая панель

type Props = {};

export default function MySider(props: Props) {
  const user: IUser = useTypedSelector((state) => state.auth.user);

  const [buttonsArr, setButtonsArr] = useState<IMenuButton[]>(
    getButtonsMenu(user)
  );

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
        <Menu.Item key="user" icon={<UserOutlined />}>
          <NavLink to={RouteNames.USER_ID}> {user.fio} </NavLink>
        </Menu.Item>
        <MenuCard user={user}></MenuCard>

        {buttonsArr.map((b) => (
          <Menu.Item key={b.key} icon={<b.icon />}>
            <NavLink to={b.link}>{b.label}</NavLink>
          </Menu.Item>
        ))}

        <Menu.Item
          key="logout"
          icon={<PoweroffOutlined />}
          onClick={() => {
            logout();
            setButtonsArr([]);
          }}
        >
          Выйти
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
