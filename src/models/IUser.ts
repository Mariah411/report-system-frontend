import { IRole } from "./IRole";
import { IPlace } from "./IPlace";
// модель пользователя
export interface IUser {
  id: number;
  email: string;
  password: string;
  fio: string;
  roles: IRole[];
  //roles: string[];
  //places: string[];
  places: IPlace[];
}
