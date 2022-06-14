import { RouteNames } from "../router"

export interface IMenuButton{
    num: number,
    key: string
    icon: any,
    label: string,
    isBadge: boolean,
    link: RouteNames,
    //clickable: boolean
}