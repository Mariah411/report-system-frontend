import EventPage from "../pages/EventPage";
import FirstPage from "../pages/FirstPage";
import Login from "../pages/Login";
import ProgrammsPage from "../pages/ProgrammsPage";
import ReportPage from "../pages/ReportPage";
import SettingsPage from "../pages/SettingsPage";

import TasksPage from "../pages/TasksPage";

import { RouteNames } from "./routeNames";

// интерфейс маршрута
export interface IRoute {
  path: string;
  element: React.ComponentType;
  index: boolean;
}

//публичные маршруты

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
  { path: RouteNames.TASKS_ID, element: ReportPage, index: false },
];
