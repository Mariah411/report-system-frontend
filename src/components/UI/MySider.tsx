import { Menu, MenuProps } from "antd";
import Sider from "antd/lib/layout/Sider";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AccountBtn,
  LogoutBtn,
  menuButtonsAdmin2,
  menuButtonsUser2,
} from "../../data/menuData";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelectror";
import { IMenuButton } from "../../models/IMenuButton";
import { IUser } from "../../models/IUser";
import MenuCard from "./menuCard/MenuCard";

import { checkRoles } from "../../utils/checkRoles";

// боковая панель

type Props = {};

export default function MySider(props: Props) {
  const user: IUser = useTypedSelector((state) => state.auth.user);

  const { logout } = useActions();

  const getMenuBtns = (arr: IMenuButton[]) => {
    return arr.map((b) => getMenuBtn(b));
  };

  const getMenuBtn = (b: IMenuButton) => {
    if (b.link) {
      return {
        key: b.key,
        icon: <b.icon />,
        label: <NavLink to={b.link}>{b.label}</NavLink>,
      };
    }
    return {
      key: b.key,
      icon: <b.icon />,
      label: b.label,
    };
  };

  const makeMenu = (
    user: IUser,
    menuButtonsUser: IMenuButton[],
    menuButtonsAdmin: IMenuButton[]
  ): MenuProps["items"] => {
    const isUser = checkRoles(user, "USER");
    const isAdmin = checkRoles(user, "ADMIN");

    const userBtns = getMenuBtns(menuButtonsUser);
    const adminBtns = getMenuBtns(menuButtonsAdmin);

    let items: MenuProps["items"] = [{ ...getMenuBtn(AccountBtn) }];

    if (isUser) {
      items?.push({
        label: "Пользователь",
        key: "g1",
        children: [...userBtns],
        type: "group",
      });
    }

    if (isAdmin) {
      items?.push({
        label: "Администратор",
        key: "g2",
        children: [...adminBtns],
        type: "group",
      });
    }

    items?.push({
      ...getMenuBtn(LogoutBtn),
      style: { color: "red" },
      onClick: logout,
    });

    return items;
  };

  const [items, setItems] = useState<MenuProps["items"]>(
    makeMenu(user, menuButtonsUser2, menuButtonsAdmin2)
  );

  return (
    <Sider
      width={350}
      style={{
        overflow: "auto",
        height: "100vh",
        backgroundColor: "#ffff",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <MenuCard user={user}></MenuCard>

      <Menu theme="light" mode="inline" items={items}></Menu>
    </Sider>
  );
}
