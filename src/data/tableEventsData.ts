import { ColumnsType } from "antd/lib/table";

interface DataType {
  key: React.Key;
  name: string;
  school: string;
  date: string;
}

export const columns: ColumnsType<DataType> = [
  { title: "Название мероприятия", dataIndex: "name", key: "name" },
  { title: "Учреждение", dataIndex: "school", key: "school" },
  { title: "Дата проведения", dataIndex: "date", key: "date" },
];

export const data: DataType[] = [
  {
    key: 1,
    name: "Робо-сумо",
    school: "«Станция  юных техников» Алексеевского городского округа",
    date: "22.01.2022",
  },
  {
    key: 1,
    name: "Робо-сумо",
    school: "«Станция  юных техников» Алексеевского городского округа",
    date: "22.01.2022",
  },
  {
    key: 1,
    name: "Робо-сумо",
    school: "«Станция  юных техников» Алексеевского городского округа",
    date: "22.01.2022",
  },
  {
    key: 1,
    name: "Робо-сумо",
    school: "«Станция  юных техников» Алексеевского городского округа",
    date: "22.01.2022",
  },
];
