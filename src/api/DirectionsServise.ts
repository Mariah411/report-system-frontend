import axios, { AxiosResponse } from "axios";
import { IDirection } from "../models/IDirection";

export default class DirectionService {
  static async getDirections(): Promise<AxiosResponse<IDirection[]>> {
    return await axios.get<IDirection[]>("./directions.json");
  }
}
