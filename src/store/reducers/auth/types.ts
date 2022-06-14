import { IUser } from "../../../models/IUser"


// состояние
export interface AuthState  {
    isAuth: boolean,
    user: IUser,
    error: string,
    isLoading: boolean
}

// actions(действия)
export enum AuthActionEnum{
    SET_AUTH = "SET_AUTH",
    SET_USER = "SET_USER",
    SET_ERROR = "SET_ERROR",
    SET_IS_LOADING = "SET_IS_LOADING"
}

//типизация каждого действия
export interface SetAuthAction {
    type: AuthActionEnum.SET_AUTH,
    payload: boolean
}

export interface SetUserAction {
    type: AuthActionEnum.SET_USER,
    payload: IUser
}
export interface SetErrorAction {
    type: AuthActionEnum.SET_ERROR,
    payload: string
}
export interface SetIsLoadingAction {
    type: AuthActionEnum.SET_IS_LOADING,
    payload: boolean
}

// обобщенный тип действий
export type AuthActions = SetAuthAction | SetUserAction | SetErrorAction | SetIsLoadingAction
