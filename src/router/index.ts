import { adminRouteNames } from "./adminRouteNames";
import { settingsRouteNames } from "./settingsRouteNames";
import EventPage from "../pages/EventPage";
import FirstPage from "../pages/FirstPage";
import Login from "../pages/Login";
import ProgrammsPage from "../pages/user/ProgrammsPage";
import AnswerPage from "../pages/user/AnswerPage";
import SettingsPage from "../pages/admin/SettingsPage";

import TasksPage from "../pages/TasksPage";

import { RouteNames } from "./routeNames";
import UserSettings from "../pages/admin/settings/UserSettings";
import SchoolSettings from "../pages/admin/settings/SchoolSettings";
import AreaSettings from "../pages/admin/settings/AreaSettings";
import DirectionSettings from "../pages/admin/settings/DirectionSettings";
import MyEventsPage from "../pages/user/MyEventsPage";
import AllEventsPage from "../pages/admin/AllEventsPage";
import AdminTasksPage from "../pages/admin/AdminTasksPage";
import MyTasksPage from "../pages/user/MyTasksPage";
import { userRouteNames } from "./userRouteNames";
import ReportPage from "../pages/admin/ReportPage";

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
  // { path: RouteNames.TASKS_ID, element: AnswerPage, index: false },

  { path: adminRouteNames.REPORT_ID, element: ReportPage, index: false },
  { path: adminRouteNames.All_TASKS, element: AdminTasksPage, index: false },
  { path: adminRouteNames.SETTINGS, element: SettingsPage, index: false },
  { path: adminRouteNames.ALL_EVENTS, element: AllEventsPage, index: false },

  { path: userRouteNames.ANSWER_ID, element: AnswerPage, index: false },
  { path: userRouteNames.MY_TASKS, element: MyTasksPage, index: false },
  { path: userRouteNames.MY_EVENTS, element: MyEventsPage, index: false },
  { path: userRouteNames.PROGRAMMS, element: ProgrammsPage, index: false },
];

// export const userRoutes: IRoute[] = [
//   { path: userRouteNames.MY_TASKS, element: MyTasksPage, index: false },
//   { path: userRouteNames.MY_EVENTS, element: MyEventsPage, index: false },
//   { path: userRouteNames.PROGRAMMS, element: ProgrammsPage, index: false },
// ];

// export const adminRoutes: IRoute[] = [
//   { path: adminRouteNames.All_TASKS, element: AdminTasksPage, index: false },
//   { path: adminRouteNames.SETTINGS, element: SettingsPage, index: false },
//   { path: adminRouteNames.ALL_EVENTS, element: AllEventsPage, index: false },
// ];

export const settingsRoutes: IRoute[] = [
  { path: settingsRouteNames.USERS, element: UserSettings, index: false },
  { path: settingsRouteNames.SCHOOLS, element: SchoolSettings, index: false },
  { path: settingsRouteNames.AREAS, element: AreaSettings, index: false },
  {
    path: settingsRouteNames.DIRECTIONS,
    element: DirectionSettings,
    index: false,
  },
];
