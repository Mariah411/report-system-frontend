import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";

interface DataType {
  key: React.Key;
  name: string;
  school: string;
  direction: string;
  age: string;
  id_nav: number;
}

export const columns: ColumnsType<DataType> = [
  { title: "Наименование", dataIndex: "name", key: "name" },
  { title: "Учреждение", dataIndex: "school", key: "school" },
  { title: "Направление обучения", dataIndex: "direction", key: "direction" },
  { title: "Возраст", dataIndex: "age", key: "age" },
  {
    title: "id программы в системе Навигатор",
    dataIndex: "id_nav",
    key: "id_nav",
  },
];

export const data: DataType[] = [
  {
    key: 1,
    name: "3D моделирование",
    school: "«Станция  юных техников» Алексеевского городского округа",
    direction: "3D моделирование, прототипирование",
    age: "10-14",
    id_nav: 898,
  },
  {
    key: 2,
    name: "3D моделирование",
    school: "«Станция  юных техников» Алексеевского городского округа",
    direction: "3D моделирование, прототипирование",
    age: "10-14",
    id_nav: 898,
  },
  {
    key: 3,
    name: "3D моделирование",
    school: "«Станция  юных техников» Алексеевского городского округа",
    direction: "3D моделирование, прототипирование",
    age: "10-14",
    id_nav: 898,
  },
  {
    key: 4,
    name: "3D моделирование",
    school: "«Станция  юных техников» Алексеевского городского округа",
    direction: "3D моделирование, прототипирование",
    age: "10-14",
    id_nav: 898,
  },
];
