import { IPlaceType } from "./IPlaceType";
export interface IPlace {
  id: number;
  name: string;
  place_type: IPlaceType;
}
