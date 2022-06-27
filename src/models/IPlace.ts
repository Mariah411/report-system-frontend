import { ICreateUpdate } from "./ICreateUpdate";
import { IPlaceType } from "./IPlaceType";
export interface IPlace {
  id: number;
  name: string;
  place_type: IPlaceType;
}

export type PlaceAdmin = Omit<IPlace, "place_type"> & { place_type_id: number };
