export interface MyData {
  id: number;
  title: string;
  description: string;
}

export const cardsData1: MyData[] = [
  {
    id: 1,
    title: "Отчет 2022 1 Полугодие",
    description: "Добавил(а) Иванова А.А.",
  },
  {
    id: 2,
    title: "Отчет 2022 2 Полугодие",
    description: "Добавил(а) Иванова А.А.",
  },
  {
    id: 3,
    title: "Отчет 2023 1 Полугодие",
    description: "Добавил(а) Иванова А.А.",
  },
  {
    id: 4,
    title: "Отчет 2023 2 Полугодие",
    description: "Добавил(а) Иванова А.А.",
  },
];

export const cardsData2: MyData[] = [
  {
    id: 5,
    title: "Отчет 2020 1 Полугодие",
    description: "Добавил(а) Иванова А.А.",
  },
  {
    id: 6,
    title: "Отчет 2020 2 Полугодие",
    description: "Добавил(а) Иванова А.А.",
  },
  {
    id: 7,
    title: "Отчет 2020 1 Полугодие",
    description: "Добавил(а) Иванова А.А.",
  },
  {
    id: 8,
    title: "Отчет 2020 2 Полугодие",
    description: "Добавил(а) Иванова А.А.",
  },
];

export function getCardsData(typeTask: string | number): MyData[] {
  return typeTask == "Активные" ? cardsData1 : cardsData2;
}
