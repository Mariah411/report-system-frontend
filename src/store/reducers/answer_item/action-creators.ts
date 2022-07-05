import { IPlaceAnswer, IProgrammAnswer } from "./../../../models/IAnswer";
import {
  AnswerItemActionEnum,
  SetPlaceDataAction,
  SetPlaceIDAction,
  SetProgramDataAction,
} from "./types";

export const AnswerItemCreators = {
  setPlace: (place_id: number): SetPlaceIDAction => ({
    type: AnswerItemActionEnum.SET_PLACE_ID,
    payload: place_id,
  }),
  setPlaceData: (place_data: IPlaceAnswer[]): SetPlaceDataAction => ({
    type: AnswerItemActionEnum.SET_PLACE_DATA,
    payload: place_data,
  }),
  setProgrammData: (
    programm_data: IProgrammAnswer[]
  ): SetProgramDataAction => ({
    type: AnswerItemActionEnum.SET_PROGRAMM_DATA,
    payload: programm_data,
  }),
};
