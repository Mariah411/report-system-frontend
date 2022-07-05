import { AppDispatch } from "./../../index";
import { IUser } from "./../../../models/IUser";
import {
  AuthActionEnum,
  SetUserAction,
  SetIsLoadingAction,
  SetErrorAction,
  SetAuthAction,
} from "./types";
import axios, { AxiosError } from "axios";
import { join } from "path";

import jwt_decode from "jwt-decode";
import TaskService from "../../../api/TaskServise";
import { message } from "antd";

//action-creator (создание действий)
//с указанием какие данные принимаает, что возвращает
interface loginResponse {
  token: string;
  message: string;
}

// interface customError<AxiosError>{
//   response:{
//     data:{
//       message: string
//     }
//   }
// }
export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),
  setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload: isLoading,
  }),
  setError: (error: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload: error,
  }),
  setAuth: (isAuth: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: isAuth,
  }),

  // экшн для логина

  login: (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));

      const { data } = await axios.post<loginResponse>("api/v1/auth/login", {
        mail: email,
        password: password,
      });

      console.log(jwt_decode(data.token));

      localStorage.setItem("token", data.token);

      const user: IUser = jwt_decode(data.token);

      dispatch(AuthActionCreators.setUser(user));
      dispatch(AuthActionCreators.setAuth(true));
      dispatch(AuthActionCreators.setIsLoading(false));
    } catch (e: any) {
      const err = e as AxiosError<loginResponse>;
      //console.log(err);

      if (typeof err.response?.data.message === "string") {
        dispatch(AuthActionCreators.setError(err.response?.data.message));
      }
      //dispatch(AuthActionCreators.setError(e.response.message));
      dispatch(AuthActionCreators.setIsLoading(false));
    }
  },

  // выход из системы
  logout: () => async (dispatch: AppDispatch) => {
    try {
      localStorage.removeItem("token");
      dispatch(AuthActionCreators.setUser({} as IUser));
      dispatch(AuthActionCreators.setAuth(false));
    } catch (e) {
      dispatch(AuthActionCreators.setError("Произошла ошибка при выходе"));
    }
  },

  checkAuth: () => async (dispatch: AppDispatch) => {
    if (localStorage.getItem("token")) {
      const response = TaskService.getTasks()
        .then(() => {
          const user = jwt_decode(localStorage.getItem("token") || "");
          dispatch(AuthActionCreators.setUser(user as IUser));
          dispatch(AuthActionCreators.setAuth(true));
          return true;
        })
        .catch((err) => {
          dispatch(
            AuthActionCreators.setError(
              "Время вашей сессии истекло. Пожалуйста, авторизуйтесь повторно"
            )
          );
          localStorage.removeItem("token");
          return false;
        });
    }
  },
};
