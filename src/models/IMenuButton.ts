//import { RouteNames } from "../router"
import { RouteNames } from "../router/routeNames";

export interface IMenuButton {
  num: number;
  key: string;
  icon: any;
  label: string;
  isBadge: boolean;
  link: RouteNames;
  //clickable: boolean
}
