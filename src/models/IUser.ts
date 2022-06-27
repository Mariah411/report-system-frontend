import { ITask } from "./ITask";
import { IRole } from "./IRole";
import { IPlace } from "./IPlace";
// модель пользователя
export interface IUser {
  id: number;
  mail: string;
  password: string;
  fio: string;
  roles: IRole[];
  //roles: string[];
  //places: string[];
  places: IPlace[];
}

export type UserEdit = IUser & { tasks: ITask[] };
