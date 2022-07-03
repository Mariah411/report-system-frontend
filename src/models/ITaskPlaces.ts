import { IPlace } from "./IPlace";
import { IProgram } from "./IProgram";

export type ITaskPlaces = IPlace & {
  programms: IProgram[];
};
