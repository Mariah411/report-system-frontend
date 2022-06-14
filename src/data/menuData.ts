import { IMenuButton } from "../models/IMenuButton";
import { RouteNames } from "../router/index";

import {
  UserOutlined,
  ProfileOutlined,
  FileDoneOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  PoweroffOutlined,
  HomeOutlined,
  SettingOutlined,
  CrownOutlined,
} from "@ant-design/icons";

export let menuButtons: IMenuButton[] = [
  {
    num: 1,
    key: "user",
    icon: UserOutlined,
    label: "",
    isBadge: false,
    link: RouteNames.USER_ID,
  },
  {
    num: 2,
    key: "place",
    icon: HomeOutlined,
    label: "Белгородский район",
    isBadge: false,
    link: RouteNames.USER_ID,
  },
  {
    num: 3,
    key: "info",
    icon: InfoCircleOutlined,
    label: "Мой профиль",
    isBadge: false,
    link: RouteNames.USER_ID,
  },
  {
    num: 4,
    key: "tasks",
    icon: ProfileOutlined,
    label: "Задания",
    isBadge: true,
    link: RouteNames.TASKS,
  },
  {
    num: 5,
    key: "programms",
    icon: FileDoneOutlined,
    label: "Образовательные программы",
    isBadge: false,
    link: RouteNames.PROGRAMMS,
  },
  {
    num: 6,
    key: "events",
    icon: CalendarOutlined,
    label: "Мероприятия",
    isBadge: false,
    link: RouteNames.EVENTS,
  },
  // { key:  "logout",  icon: <PoweroffOutlined />, label: "Выйти" },

  //hhhhhh

  //111
];
