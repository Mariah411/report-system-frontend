import axios, { AxiosResponse } from "axios";
import { $authHost } from "../http";
import { ReqConfig } from "../http";

import { IPlace, PlaceAdmin } from "../models/IPlace";

export default class PlacesService {
  static async getPlaces(): Promise<AxiosResponse<PlaceAdmin[]>> {
    // return await $authHost.get<PlaceAdmin[]>("/api/v1/entity/place");
    return await axios.get<PlaceAdmin[]>("/api/v1/entity/place", ReqConfig());
  }

  // static getSchools(places: PlaceAdmin[]): PlaceAdmin[] {
  //   const SchoolsData = places.filter((place) => place.place_type_id === 2);
  //   return SchoolsData;
  // }

  // static getAreas(places: PlaceAdmin[]): PlaceAdmin[] {
  //   const AreaData = places.filter((place) => place.place_type_id === 1);
  //   return AreaData;
  // }

  static async getSchools(): Promise<PlaceAdmin[]> {
    const response = await this.getPlaces();
    const SchoolsData = response.data.filter(
      (place) => place.place_type_id === 2
    );
    return SchoolsData;
  }

  static async getAreas(): Promise<PlaceAdmin[]> {
    const response = await this.getPlaces();
    const AreasData = response.data.filter(
      (place) => place.place_type_id === 1
    );
    return AreasData;
  }

  static async addPlace(
    name: string,
    place_type_id: number
  ): Promise<AxiosResponse<number>> {
    return await axios.post<number>(
      "/api/v1/entity/place",
      { name: name, place_type_id: place_type_id },
      ReqConfig()
    );
  }

  static async addSchool(name: string): Promise<AxiosResponse<number>> {
    return await this.addPlace(name, 2);
  }
  static async addArea(name: string): Promise<AxiosResponse<number>> {
    return await this.addPlace(name, 1);
  }

  static async setControl(
    account_id: number,
    place_id: number
  ): Promise<AxiosResponse<number>> {
    return await axios.post<number>(
      "/api/v1/entity/control",
      { account_id: account_id, place_id: place_id },
      ReqConfig()
    );
  }
}
