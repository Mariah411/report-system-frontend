import { ColumnsType } from "antd/lib/table";
import { PlaceAdmin } from "../models/IPlace";

export const colsSchool: ColumnsType<PlaceAdmin> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Название учреждения",
    dataIndex: "name",
    key: "name",
  },
];

export const colsArea: ColumnsType<PlaceAdmin> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Название района",
    dataIndex: "name",
    key: "name",
  },
];
