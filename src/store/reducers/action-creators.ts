import { AnswerItemCreators } from "./answer_item/action-creators";
import { AuthActionCreators } from "./auth/action-creators";

export const AllActionCreators = {
  ...AuthActionCreators,
  ...AnswerItemCreators,
};
