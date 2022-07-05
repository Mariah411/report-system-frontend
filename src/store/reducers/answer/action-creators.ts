import { AnswerItemCreators } from "./../answer_item/action-creators";
import { AppDispatch } from "./../../index";
import {
  IAnswerItem,
  IPlaceAnswer,
  IProgrammAnswer,
} from "./../../../models/IAnswer";
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
    (dispatch: AppDispatch) => {
      let newAnswerData: IAnswerItem[] = [...state.answer];

      let PlaceData =
        newAnswerData.find((item) => item.place_id === place_id) ||
        ({} as IAnswerItem);

      if (PlaceData) {
        PlaceData = { ...PlaceData, place_data: place_data };

        newAnswerData = newAnswerData.map((item) =>
          item.place_id === place_id ? { ...PlaceData } : item
        );

        dispatch(AnswerActionCreators.setAnswer(newAnswerData));
      }
    },

  setProgrammDataForPlace:
    (state: AnswerState, place_id: number, programm_data: IProgrammAnswer[]) =>
    (dispatch: AppDispatch) => {
      let newAnswerData: IAnswerItem[] = [...state.answer];

      let PlaceData =
        newAnswerData.find((item) => item.place_id === place_id) ||
        ({} as IAnswerItem);

      if (PlaceData) {
        PlaceData = { ...PlaceData, programm_data: programm_data };

        newAnswerData = newAnswerData.map((item) =>
          item.place_id === place_id ? { ...PlaceData } : item
        );

        dispatch(AnswerActionCreators.setAnswer(newAnswerData));
      }
    },

  setTaskAndAnswer:
    (task_id: number, answer: IAnswerItem[]) => (dispatch: AppDispatch) => {
      dispatch(AnswerActionCreators.setAnswer(answer));
      dispatch(AnswerActionCreators.setTask(task_id));
    },
};
