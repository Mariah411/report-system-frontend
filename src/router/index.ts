import EventPage from "../pages/EventPage";
import FirstPage from "../pages/FirstPage";
import Login from "../pages/Login";
import ProgrammsPage from "../pages/ProgrammsPage";
import SettingsPage from "../pages/SettingsPage";

import TasksPage from "../pages/TasksPage";

// интерфейс маршрута
export interface IRoute {
  path: string;
  element: React.ComponentType;
  index: boolean;
}

//перечисление маршрутов
export enum RouteNames {
  LOGIN = "/login",
  FIRST = "/",
  TASKS = "tasks",
  USER_ID = "/user/:id",
  PROGRAMMS = "/programms",
  EVENTS = "/events",
  SETTINGS = "settings",
}

/*//публичные маршруты
export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, element: Login},

]

//приватные маршруты
export const privateRoutes: IRoute[] = [
    {path: RouteNames.FIRST, element: FirstPage, },
    {path: RouteNames.TASKS, element: TasksPage},
    {path: RouteNames.SETTINGS, element: SettingsPage},
    {path: RouteNames.EVENTS, element: EventPage},
    {path: RouteNames.PROGRAMMS, element: EventPage},

]*/

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, element: Login, index: false },
];

//приватные маршруты
export const privateRoutes: IRoute[] = [
  { path: RouteNames.FIRST, element: FirstPage, index: true },
  { path: RouteNames.TASKS, element: TasksPage, index: false },
  { path: RouteNames.SETTINGS, element: SettingsPage, index: false },
  { path: RouteNames.EVENTS, element: EventPage, index: false },
  { path: RouteNames.PROGRAMMS, element: ProgrammsPage, index: false },
];
