import { AnswerItemState } from "../answer_item/types";
import {
  IPlaceAnswer,
  IProgrammAnswer,
  IAnswerItem,
} from "./../../../models/IAnswer";

export interface AnswerState {
  task_id: number;
  answer: IAnswerItem[];
}

export enum AnswerActionEnum {
  SET_TASK = "SET_TASK",
  SET_ANSWER = "SET_ANSWER",
}

export interface SetTaskAction {
  type: AnswerActionEnum.SET_TASK;
  payload: number;
}

export interface SetAnswerAction {
  type: AnswerActionEnum.SET_ANSWER;
  payload: IAnswerItem[];
}

export type AnswerActions = SetTaskAction | SetAnswerAction;
