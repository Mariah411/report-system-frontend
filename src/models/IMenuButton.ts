import { RouteNames } from "../router/routeNames";

export interface IMenuButton {
  num?: number;
  key: string;
  icon: any;
  label: string;
  link?: RouteNames;
}
