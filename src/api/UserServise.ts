import axios, { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { $authHost, ReqConfig } from "../http";

export default class UserService {
  static async getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return await axios.get<IUser[]>("/api/v1/entity/account", ReqConfig);
    // return await $authHost.get<IUser[]>("/api/v1/entity/account");
  }
}
