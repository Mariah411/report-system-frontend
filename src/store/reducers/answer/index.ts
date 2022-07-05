import { IAnswerItem } from "./../../../models/IAnswer";
import { AnswerState, AnswerActions, AnswerActionEnum } from "./types";

const initialState: AnswerState = {
  task_id: 0,
  answer: [] as IAnswerItem[],
};

export default function answerReducer(
  state = initialState,
  action: AnswerActions
): AnswerState {
  switch (action.type) {
    case AnswerActionEnum.SET_TASK:
      return { ...state, task_id: action.payload };
    case AnswerActionEnum.SET_ANSWER:
      return { ...state, answer: action.payload };

    default:
      return state;
  }
}
