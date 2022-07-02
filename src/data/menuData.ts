import { userRouteNames } from "./../router/userRouteNames";
import { IMenuButton } from "../models/IMenuButton";
import { RouteNames } from "../router/routeNames";
import {
  CalendarOutlined,
  CrownOutlined,
  FileDoneOutlined,
  InfoCircleOutlined,
  ProfileOutlined,
  SettingOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { adminRouteNames } from "../router/adminRouteNames";

export let menuButtonsUser2: IMenuButton[] = [
  {
    key: "my_tasks",
    icon: ProfileOutlined,
    label: "Мои отчеты",
    link: userRouteNames.MY_TASKS,
  },
  {
    key: "programms",
    icon: FileDoneOutlined,
    label: "Образовательные программы",
    link: userRouteNames.PROGRAMMS,
  },
  {
    key: "my_events",
    icon: CalendarOutlined,
    label: "Мои мероприятия",
    link: userRouteNames.MY_EVENTS,
  },
];

export let menuButtonsAdmin2: IMenuButton[] = [
  {
    key: "all_tasks",
    icon: ProfileOutlined,
    label: "Все отчеты",
    link: adminRouteNames.All_TASKS,
  },
  {
    key: "all_events",
    icon: CalendarOutlined,
    label: "Все мероприятия",
    link: adminRouteNames.ALL_EVENTS,
  },
  {
    key: "settings",
    icon: SettingOutlined,
    label: "Управление системой",
    link: adminRouteNames.SETTINGS,
  },
];

export let AccountBtn: IMenuButton = {
  key: "account",
  icon: InfoCircleOutlined,
  label: "Мой профиль",
  link: RouteNames.USER_ID,
};

export let LogoutBtn: IMenuButton = {
  key: "logout",
  icon: PoweroffOutlined,
  label: "Выйти",
};
