import { AnswerItemCreators } from "./../answer_item/action-creators";
import { AppDispatch } from "./../../index";
import { IAnswerItem, IPlaceAnswer } from "./../../../models/IAnswer";
import {
  AnswerActionEnum,
  SetTaskAction,
  SetAnswerAction,
  AnswerState,
} from "./types";
export const AnswerActionCreators = {
  setTask: (task_id: number): SetTaskAction => ({
    type: AnswerActionEnum.SET_TASK,
    payload: task_id,
  }),
  setAnswer: (answer: IAnswerItem[]): SetAnswerAction => ({
    type: AnswerActionEnum.SET_ANSWER,
    payload: answer,
  }),

  setPlaceDataForPlace:
    (state: AnswerState, place_id: number, place_data: IPlaceAnswer[]) =>
    async (dispatch: AppDispatch) => {
      state.answer.find((item) => item.place_id === place_id);
      dispatch(AnswerItemCreators.setPlaceData(place_data));
    },
};
