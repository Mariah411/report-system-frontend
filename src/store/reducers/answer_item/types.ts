import { IPlaceAnswer, IProgrammAnswer } from "../../../models/IAnswer";

export interface AnswerItemState {
  place_id: number;
  place_data: IPlaceAnswer[];
  programm_data: IProgrammAnswer[];
}

export enum AnswerItemActionEnum {
  SET_PLACE_ID = "SET_PLACE_ID",
  SET_PLACE_DATA = "SET_PLACE_DATA",
  SET_PROGRAMM_DATA = "SET_PROGRAMM_DATA",
}

export interface SetPlaceIDAction {
  type: AnswerItemActionEnum.SET_PLACE_ID;
  payload: number;
}

export interface SetPlaceDataAction {
  type: AnswerItemActionEnum.SET_PLACE_DATA;
  payload: IPlaceAnswer[];
}

export interface SetProgramDataAction {
  type: AnswerItemActionEnum.SET_PROGRAMM_DATA;
  payload: IProgrammAnswer[];
}

export type AnswerItemActions =
  | SetPlaceDataAction
  | SetProgramDataAction
  | SetPlaceIDAction;
