import { ColumnsType } from "antd/lib/table";

interface DataType {
  key: React.Key;
  name: string;
  place: string;
  date: string;
}

export const columns: ColumnsType<DataType> = [
  { title: "Название мероприятия", dataIndex: "name", key: "name" },
  { title: "Место проведения", dataIndex: "place", key: "place" },
  { title: "Дата проведения", dataIndex: "date", key: "date" },
];

export const data: DataType[] = [
  {
    key: 1,
    name: "Робо-сумо",
    place: "«Станция  юных техников» Алексеевского городского округа",
    date: "22.01.2022",
  },
  {
    key: 2,
    name: "Робо-сумо",
    place: "«Станция  юных техников» Алексеевского городского округа",
    date: "22.01.2022",
  },
  {
    key: 3,
    name: "Робо-сумо",
    place: "«Станция  юных техников» Алексеевского городского округа",
    date: "22.01.2022",
  },
  {
    key: 4,
    name: "Робо-сумо",
    place: "«Станция  юных техников» Алексеевского городского округа",
    date: "22.01.2022",
  },
];
