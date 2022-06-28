import axios, { AxiosResponse } from "axios";
import { ReqConfig } from "../http";
import { IRole } from "../models/IRole";

export default class RolesService {
  static async getRoles(): Promise<AxiosResponse<IRole[]>> {
    return await axios.get<IRole[]>("/api/v1/entity/role", ReqConfig());
  }
  static async setPermission(
    account_id: number,
    role_id: number
  ): Promise<AxiosResponse<number>> {
    return await axios.post<number>(
      "/api/v1/entity/permission",
      {
        account_id: account_id,
        role_id: role_id,
      },
      ReqConfig()
    );
  }
}
