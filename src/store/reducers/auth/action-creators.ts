import { AppDispatch } from "./../../index";
import { IUser } from "./../../../models/IUser";
import {
  AuthActionEnum,
  SetUserAction,
  SetIsLoadingAction,
  SetErrorAction,
  SetAuthAction,
} from "./types";
import axios from "axios";
import { join } from "path";

//action-creator (создание действий)
//с указанием какие данные принимаает, что возвращает

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

      // получение моковых данных (заменить)
      setTimeout(async () => {
        // заменить
        const response = await axios.get<IUser[]>("./users.json");
        const mokUser = response.data.find(
          (user) => user.email === email && user.password === password
        );

        if (mokUser) {
          localStorage.setItem("auth", "true");
          localStorage.setItem("email", email);
          localStorage.setItem("roles", mokUser.roles.join(" "));
          localStorage.setItem("fio", mokUser.fio);
          console.log(mokUser.places);
          localStorage.setItem("places", JSON.stringify(mokUser.places));

          //localStorage.setItem("roles", mokUser.places.join(", "));
          // let userPlaces: string[] = [];
          // mokUser.places.map((place) => userPlaces.push(place.name));
          // localStorage.setItem("places", userPlaces.join(", "));
          dispatch(AuthActionCreators.setAuth(true));
          dispatch(AuthActionCreators.setUser(mokUser));
        } else {
          dispatch(AuthActionCreators.setError("Неверный логин или пароль"));
        }
        dispatch(AuthActionCreators.setIsLoading(false));
      }, 1000);
    } catch (e) {
      dispatch(AuthActionCreators.setError("Произошла ошибка"));
      dispatch(AuthActionCreators.setIsLoading(false));
    }
  },

  // выход из системы
  logout: () => async (dispatch: AppDispatch) => {
    try {
      localStorage.removeItem("auth");
      localStorage.removeItem("email");
      localStorage.removeItem("roles");
      localStorage.removeItem("fio");
      localStorage.removeItem("places");
      dispatch(AuthActionCreators.setUser({} as IUser));
      dispatch(AuthActionCreators.setAuth(false));
    } catch (e) {
      dispatch(AuthActionCreators.setError("Произошла ошибка при выходе"));
    }
  },
};
