import axios, { AxiosResponse } from "axios";
import { $authHost } from "../http";
import { ReqConfig } from "../http";

import { IPlace, PlaceAdmin } from "../models/IPlace";

export default class PlacesService {
  static async getPlaces(): Promise<AxiosResponse<PlaceAdmin[]>> {
    // return await $authHost.get<PlaceAdmin[]>("/api/v1/entity/place");
    return await axios.get<PlaceAdmin[]>("/api/v1/entity/place", ReqConfig);
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
}
