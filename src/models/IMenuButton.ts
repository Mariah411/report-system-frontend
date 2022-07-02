import { userRouteNames } from "./../router/userRouteNames";
import { adminRouteNames } from "./../router/adminRouteNames";
import { RouteNames } from "../router/routeNames";

export interface IMenuButton {
  num?: number;
  key: string;
  icon: any;
  label: string;
  link?: RouteNames | adminRouteNames | userRouteNames;
}
