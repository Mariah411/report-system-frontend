import { IProgram } from "./../models/IProgram";
import axios, { AxiosResponse } from "axios";

export default class ProgramsService {
  static async getProgramms(): Promise<AxiosResponse<IProgram[]>> {
    return await axios.get<IProgram[]>("./programms.json");
  }
}
