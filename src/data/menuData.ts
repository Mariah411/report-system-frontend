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

export let menuButtonsUser2: IMenuButton[] = [
  {
    key: "my_tasks",
    icon: ProfileOutlined,
    label: "Мои отчеты",
    link: RouteNames.TASKS,
  },
  {
    key: "programms",
    icon: FileDoneOutlined,
    label: "Образовательные программы",
    link: RouteNames.PROGRAMMS,
  },
  {
    key: "my_events",
    icon: CalendarOutlined,
    label: "Мои мероприятия",
    link: RouteNames.EVENTS,
  },
];

export let menuButtonsAdmin2: IMenuButton[] = [
  {
    key: "all_tasks",
    icon: ProfileOutlined,
    label: "Все отчеты",
    link: RouteNames.TASKS,
  },
  {
    key: "all_events",
    icon: CalendarOutlined,
    label: "Все мероприятия",
    link: RouteNames.EVENTS,
  },
  {
    key: "settings",
    icon: SettingOutlined,
    label: "Управление системой",
    link: RouteNames.SETTINGS,
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
