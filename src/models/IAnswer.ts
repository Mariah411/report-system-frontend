export interface IPlaceAnswer {
  code_name: string;
  value: number;
}

export interface IProgrammAnswer {
  programm_id: number;
  value: number;
}

export interface IAnswerItem {
  place_id: number;
  place_data: IPlaceAnswer[];
  programm_data: IProgrammAnswer[];
}
