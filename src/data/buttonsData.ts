import {
  CalendarOutlined,
  CrownOutlined,
  FileDoneOutlined,
  InfoCircleOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { IMenuButton } from "../models/IMenuButton";
import { IUser } from "../models/IUser";
import { RouteNames } from "../router/routeNames";
import { checkRoles } from "../utils/checkRoles";

export let menuButtonsUser: IMenuButton[] = [
  {
    num: 3,
    key: "info",
    icon: InfoCircleOutlined,
    label: "Мой профиль",
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
    link: RouteNames.PROGRAMMS,
  },
  {
    num: 6,
    key: "events",
    icon: CalendarOutlined,
    label: "Мероприятия",
    link: RouteNames.EVENTS,
  },
];

export let menuButtonsAdmin: IMenuButton[] = [
  {
    num: 2,
    key: "admin",
    icon: CrownOutlined,
    label: "Администратор",
    link: RouteNames.USER_ID,
  },
  {
    num: 3,
    key: "info",
    icon: InfoCircleOutlined,
    label: "Мой профиль",
    link: RouteNames.USER_ID,
  },
  {
    num: 4,
    key: "tasks",
    icon: ProfileOutlined,
    label: "Задания",
    link: RouteNames.TASKS,
  },
  {
    num: 5,
    key: "events",
    icon: CalendarOutlined,
    label: "Мероприятия",
    link: RouteNames.EVENTS,
  },
  {
    num: 6,
    key: "settings",
    icon: SettingOutlined,
    label: "Управление системой",
    link: RouteNames.SETTINGS,
  },
];

let menuButtonsUserAdmin: IMenuButton[] = [
  {
    num: 2,
    key: "admin",
    icon: CrownOutlined,
    label: "Администратор",
    link: RouteNames.USER_ID,
  },
  {
    num: 4,
    key: "info",
    icon: InfoCircleOutlined,
    label: "Мой профиль",
    link: RouteNames.USER_ID,
  },
  {
    num: 5,
    key: "tasks",
    icon: ProfileOutlined,
    label: "Задания",
    isBadge: true,
    link: RouteNames.TASKS,
  },
  {
    num: 6,
    key: "programms",
    icon: FileDoneOutlined,
    label: "Образовательные программы",
    link: RouteNames.PROGRAMMS,
  },
  {
    num: 7,
    key: "events",
    icon: CalendarOutlined,
    label: "Мероприятия",
    link: RouteNames.EVENTS,
  },
  {
    num: 8,
    key: "settings",
    icon: SettingOutlined,
    label: "Управление системой",
    link: RouteNames.SETTINGS,
  },
];

export function getButtonsMenu(user: IUser): IMenuButton[] {
  const isUser: boolean = checkRoles(user, "USER");
  const isAdmin: boolean = checkRoles(user, "ADMIN");

  // const isUser: boolean = user.roles.includes("user");

  // const isAdmin: boolean = user.roles.includes("admin");

  if (isUser && isAdmin) {
    return menuButtonsUserAdmin;
  } else if (isAdmin) {
    return menuButtonsAdmin;
  }
  return menuButtonsUser;
}
