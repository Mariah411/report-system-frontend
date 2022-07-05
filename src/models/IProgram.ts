import { IDirection } from "./IDirection";

export interface IProgram {
  id: number;
  name: string;
  school: string;
  direction: IDirection;
  start_age: number;
  end_age: number;
  navigator_id: number;
}

export type IProgrammReport = Omit<IProgram, "school">;
