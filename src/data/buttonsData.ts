import { RouteNames } from "../router/routeNames";
import { IUser } from "../models/IUser";
import { IMenuButton } from "../models/IMenuButton";
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

export let menuButtonsUser: IMenuButton[] = [
  {
    num: 1,
    key: "user",
    icon: UserOutlined,
    label: "",
    link: RouteNames.USER_ID,
  },
  {
    num: 2,
    key: "place",
    icon: HomeOutlined,
    label: "",
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
  // { key:  "logout",  icon: <PoweroffOutlined />, label: "Выйти" },
];

export let menuButtonsAdmin: IMenuButton[] = [
  {
    num: 1,
    key: "user",
    icon: UserOutlined,
    label: "",
    link: RouteNames.USER_ID,
  },
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
  //{ key:  "logout",  icon: <PoweroffOutlined />, label: "Выйти"},
];

let menuButtonsUserAdmin: IMenuButton[] = [
  {
    num: 1,
    key: "user",
    icon: UserOutlined,
    label: "",
    link: RouteNames.USER_ID,
  },
  {
    num: 2,
    key: "admin",
    icon: CrownOutlined,
    label: "Администратор",
    link: RouteNames.USER_ID,
  },
  {
    num: 3,
    key: "place",
    icon: HomeOutlined,
    label: "",
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
  //{ key:  "logout",  icon: <PoweroffOutlined />, label: "Выйти"},
];

function setLabel(arr: IMenuButton[], key: string, value: string): void {
  let btn = arr.find((b) => b.key === key);
  if (btn) btn.label = value;
}

export function getButtonsMenu(user: IUser): IMenuButton[] {
  const isUser: boolean = user.roles.includes("user");

  const isAdmin: boolean = user.roles.includes("admin");
  const userPlaces: string = user.places.join(", ");

  if (isUser && isAdmin) {
    setLabel(menuButtonsUserAdmin, "user", user.fio);
    setLabel(menuButtonsUserAdmin, "place", userPlaces);
    return menuButtonsUserAdmin;
  } else if (isAdmin) {
    setLabel(menuButtonsAdmin, "user", user.fio);
    return menuButtonsAdmin;
  } else if (isUser) {
    setLabel(menuButtonsUser, "user", user.fio);
    setLabel(menuButtonsUser, "place", userPlaces);
  }

  return menuButtonsUser;
}
