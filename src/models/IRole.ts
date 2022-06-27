import { IPermission } from "./IPermission";
export interface IRole {
  id: number;
  code_name: string;
  name: string;
  description: string;
  Permission?: IPermission;
}
