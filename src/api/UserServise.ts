import axios, { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { $authHost, $host } from "../http";

export default class UserService {
  static async getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return await $authHost.get<IUser[]>("/api/v1/entity/account");
    // return await axios.get<IUser[]>("/users.json");
  }
}
