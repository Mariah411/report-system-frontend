import axios, { AxiosResponse } from "axios";
import { IPlace } from "../models/IPlace";

export default class PlacesService {
  static async getPlaces(): Promise<AxiosResponse<IPlace[]>> {
    return await axios.get<IPlace[]>("/places.json");
  }

  static async getSchools(): Promise<IPlace[]> {
    const response = await this.getPlaces();
    const SchoolsData = response.data.filter((place) => place.type === 2);
    return SchoolsData;
  }
}
