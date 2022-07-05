import { IProgrammAnswer } from "../../../models/IAnswer";
import { IPlaceAnswer } from "../../../models/IAnswer";
import {
  AnswerItemActionEnum,
  AnswerItemActions,
  AnswerItemState,
} from "./types";

const initialState: AnswerItemState = {
  place_id: 0,
  place_data: [] as IPlaceAnswer[],
  programm_data: [] as IProgrammAnswer[],
};

export default function answerItemReducer(
  state = initialState,
  action: AnswerItemActions
): AnswerItemState {
  switch (action.type) {
    case AnswerItemActionEnum.SET_PLACE_ID:
      return { ...state, place_id: action.payload };
    case AnswerItemActionEnum.SET_PLACE_DATA:
      return { ...state, place_data: action.payload };
    case AnswerItemActionEnum.SET_PROGRAMM_DATA:
      return { ...state, programm_data: action.payload };

    default:
      return state;
  }
}
