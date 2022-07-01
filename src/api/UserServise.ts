import axios, { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { $authHost, ReqConfig } from "../http";
import { StringDecoder } from "string_decoder";
import { IRole } from "../models/IRole";
import RolesService from "./RolesServise";
import PlacesService from "./PlacesService";

export default class UserService {
  static async getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return await axios.get<IUser[]>("/api/v1/entity/account", ReqConfig());
    // return await $authHost.get<IUser[]>("/api/v1/entity/account");
  }

  static async createUser(
    FIO: string,
    mail: string,
    password: string
  ): Promise<AxiosResponse<{ id: number }>> {
    return await axios.post<{ id: number }>(
      "/api/v1/entity/account",
      { FIO: FIO, mail: mail, password: password },
      ReqConfig()
    );
  }

  static async addUserWithRolesPlaces(
    FIO: string,
    mail: string,
    password: string,
    roles: string[] | number[],
    places: number[]
  ) {
    await this.createUser(FIO, mail, password).then((response) => {
      const userID = response.data.id;
      roles.forEach((role) => RolesService.setPermission(userID, Number(role)));
      places.forEach((place) => PlacesService.setControl(userID, place));
      return userID;
    });
    return 0;
  }
}
