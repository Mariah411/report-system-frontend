import { ColumnsType } from "antd/lib/table";
import { IDirection } from "../models/IDirection";

export const directionCols: ColumnsType<IDirection> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Название направления",
    dataIndex: "name",
    key: "name",
  },
];
