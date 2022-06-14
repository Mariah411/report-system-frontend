import { IUser } from "./../../../models/IUser";
import { AuthActionEnum, AuthActions, AuthState } from "./types";

//начальное состояние авторизации
const initialState: AuthState = {
  isAuth: false,
  user: {} as IUser,
  error: "",
  isLoading: false,
};

// редюсер авторизации, возвращаемые состояния для каждого действия
export default function authReducer(
  state = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionEnum.SET_AUTH:
      return { ...state, isAuth: action.payload };
    case AuthActionEnum.SET_ERROR:
      return { ...state, error: action.payload };
    case AuthActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case AuthActionEnum.SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
