import { IProgram } from "./../models/IProgram";
import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";

export type IProgramDataType = IProgram & { key: React.Key };

export const columns: ColumnsType<IProgramDataType> = [
  { title: "Наименование", dataIndex: "name", key: "name" },
  {
    title: "Учреждение",
    dataIndex: "school",
    key: "school",
    defaultSortOrder: "descend",
    // sorter: (a, b) => {
    //   let strA = a.school.toLowerCase;
    //   let strB = b.school.toLowerCase;
    //   if (strA < strB) return -1;
    //   if (strA > strB) return 1;
    //   return 0;
    // },
  },
  { title: "Направление обучения", dataIndex: "direction", key: "direction" },
  { title: "Возраст", dataIndex: "age", key: "age" },
  {
    title: "id программы в системе Навигатор",
    dataIndex: "id_nav",
    key: "id_nav",
  },
];

// export const data: DataType[] = [
//   {
//     key: 1,
//     name: "3D моделирование",
//     school: "«Станция  юных техников» Алексеевского городского округа",
//     direction: "3D моделирование, прототипирование",
//     age: "10-14",
//     id_nav: 898,
//   },
//   {
//     key: 2,
//     name: "3D моделирование",
//     school: "«Станция  юных техников» Алексеевского городского округа",
//     direction: "3D моделирование, прототипирование",
//     age: "10-14",
//     id_nav: 898,
//   },
//   {
//     key: 3,
//     name: "3D моделирование",
//     school: "«Станция  юных техников» Алексеевского городского округа",
//     direction: "3D моделирование, прототипирование",
//     age: "10-14",
//     id_nav: 898,
//   },
//   {
//     key: 4,
//     name: "3D моделирование",
//     school: "«Станция  юных техников» Алексеевского городского округа",
//     direction: "3D моделирование, прототипирование",
//     age: "10-14",
//     id_nav: 898,
//   },
// ];
