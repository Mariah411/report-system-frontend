import axios, { AxiosResponse } from "axios";
import { ReqConfig } from "../http";
import { IDirection } from "../models/IDirection";

export default class DirectionService {
  static async getDirectionsAdmin(): Promise<AxiosResponse<IDirection[]>> {
    return await axios.get<IDirection[]>(
      "/api/v1/entity/direction",
      ReqConfig()
    );
  }
  static async getDirections(): Promise<AxiosResponse<IDirection[]>> {
    return await axios.get<IDirection[]>("/api/v1/entity/direction");
  }

  static async addDirection(name: string): Promise<AxiosResponse<number>> {
    return await axios.post<number>(
      "/api/v1/entity/direction",
      { name: name },
      ReqConfig()
    );
  }
}
