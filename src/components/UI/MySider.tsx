import { PoweroffOutlined } from "@ant-design/icons";
import { Badge, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { getButtonsMenu } from "../../data/buttonsData";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelectror";
import { IMenuButton } from "../../models/IMenuButton";
import { IUser } from "../../models/IUser";

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
        {buttonsArr.map((b) =>
          b.isBadge ? (
            <Menu.Item key={b.key} icon={<b.icon />}>
              {<NavLink to={b.link}>{b.label}</NavLink>}

              <Badge count={5} offset={[100, -2]}></Badge>
            </Menu.Item>
          ) : (
            <Menu.Item key={b.key} icon={<b.icon />}>
              {<NavLink to={b.link}>{b.label}</NavLink>}
            </Menu.Item>
          )
        )}
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
