import { ITaskPlaces } from "./../models/ITaskPlaces";
import { ITask, TaskUser } from "./../models/ITask";
import axios, { AxiosResponse } from "axios";
import { $authHost, ReqConfig } from "../http";
import { ITableData } from "../models/ITableData";

export default class TaskService {
  static async getTasks(): Promise<AxiosResponse<TaskUser[]>> {
    return await axios.get<TaskUser[]>("/api/v1/tasks", ReqConfig());
    //return await $authHost.get<TaskUser[]>("/api/v1/task");
  }

  static async addTask(
    half_year: number,
    year: number,
    account_id: number
  ): Promise<AxiosResponse<number>> {
    // return await $authHost.post("/api/v1/entity/task", {
    //   half_year,
    //   year,
    //   account_id,
    // });

    return await axios.post(
      "api/v1/entity/task",
      {
        half_year: half_year,
        year: year,
        account_id: account_id,
      },
      ReqConfig()
    );
  }

  static async getReport(
    id: string,
    type: number
  ): Promise<AxiosResponse<ITableData>> {
    return await axios.post<ITableData>(
      `/api/v1/task/${id}/type/${type}`,
      {},
      ReqConfig()
    );
  }

  static async getReportPlaces(
    id: string
  ): Promise<AxiosResponse<ITaskPlaces[]>> {
    return await axios.get(`/api/v1/task/${id}`, ReqConfig());
  }
}
