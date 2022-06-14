//import { RouteNames } from "../router";
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

enum RouteNames {
  LOGIN = "/login",
  FIRST = "/",
  TASKS = "tasks",
  USER_ID = "/user/:id",
  PROGRAMMS = "/programms",
  EVENTS = "/events",
  SETTINGS = "settings",
}

export let menuButtonsUser: IMenuButton[] = [
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
];

/*export let menuButtonsUser: IMenuButton[] = [
  { num: 1, key:  "user", icon: UserOutlined, label: "", isBadge: false },
  { num: 2, key:  "place", icon:  HomeOutlined , label: "Белгородский район", isBadge: false},
  { num: 3, key:  "info", icon: InfoCircleOutlined  , label: "Мой профиль", isBadge: false},
  { num: 4, key:  "tasks",  icon: ProfileOutlined , label: "Задания", isBadge: true },
  { num: 5, key:  "programms",  icon: FileDoneOutlined , label: "Образовательные программы", isBadge: false },
  { num: 6, key:  "events",  icon: CalendarOutlined , label: "Мероприятия", isBadge: false },
 // { key:  "logout",  icon: <PoweroffOutlined />, label: "Выйти" },   
];
*/

export let menuButtonsAdmin: IMenuButton[] = [
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
    key: "admin",
    icon: CrownOutlined,
    label: "Администратор",
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
    key: "events",
    icon: CalendarOutlined,
    label: "Мероприятия",
    isBadge: false,
    link: RouteNames.EVENTS,
  },
  {
    num: 6,
    key: "settings",
    icon: SettingOutlined,
    label: "Управление системой",
    isBadge: false,
    link: RouteNames.SETTINGS,
  },
  //{ key:  "logout",  icon: <PoweroffOutlined />, label: "Выйти"},
];

/*  export let menuButtonsAdmin : IMenuButton[] = [
     { num: 1, key:  "user",  icon: UserOutlined, label: "", isBadge: false },
     {num: 2,  key:  "admin", icon: CrownOutlined  , label: "Администратор", isBadge: false},
     { num: 3,key:  "info", icon: InfoCircleOutlined  , label: "Мой профиль", isBadge: false},
     { num: 4, key:  "tasks",  icon: ProfileOutlined , label: "Задания", isBadge: true },
     { num: 5, key:  "events",  icon: CalendarOutlined , label: "Мероприятия", isBadge: false },
     { num: 6, key:  "settings",  icon: SettingOutlined , label: "Управление системой", isBadge: false },
     //{ key:  "logout",  icon: <PoweroffOutlined />, label: "Выйти"},
  ]
*/

export function getButtonsMenu(user: IUser): IMenuButton[] {
  console.log(`вызов функции для пользователя ${user.fio}`);
  const userRoles = user.roles.join(" ");
  const userPlaces = user.places.join(", ");

  //console.log(user.roles)

  const isUser = user.roles.includes("user");

  const isAdmin = user.roles.includes("admin");

  console.log(isUser, isAdmin);
  let user_btn;
  let place_btn;

  if (isUser) {
    user_btn = menuButtonsUser.find((b) => b.key === "user");
    if (user_btn) user_btn.label = user.fio;

    place_btn = menuButtonsUser.find((b) => b.key === "place");
    if (place_btn != undefined) place_btn.label = userPlaces;
  } else {
    user_btn = menuButtonsAdmin.find((b) => b.key === "user");
    if (user_btn != undefined) user_btn.label = user.fio;
  }

  if (isUser && isAdmin) {
    console.log("Две роли обнаружены!");

    let result = [...menuButtonsUser];
    menuButtonsAdmin.forEach((item) => {
      if (result.find((i) => i.key === item.key) === undefined)
        result.push(item);
    });

    return result.sort((a, b) => (a.num > b.num ? 1 : -1));
  } else if (isAdmin) {
    console.log("для админа");
    return menuButtonsAdmin;
  }

  console.log("для пользователя");
  console.log("user", menuButtonsUser);
  return menuButtonsUser;
}

//menuButtonsAdmin = menuButtonsAdmin.map((b, index) => ({num: index, ...b}))

/*let result = menuButtonsUser
  menuButtonsAdmin.forEach(item => {
    if (result.find(i => i.key === item.key) === undefined)
    result.push(item)
  })

  export const menuButtons  = result.sort((a, b) => a.num > b.num ? 1 : -1)*/

//export const menuButtons = result

/*
  export const menuButtons = menuButtonsAdmin.map((b, index) => ({
    key: String(index + 1),
    ...b,
  }))*/
