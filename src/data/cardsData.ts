export interface MyData{
    title: string,
    description: string
  }

  export const cardsData1:MyData[] = [
    {
      title: "Отчет 2022 1 Полугодие",
      description: "Добавил(а) Иванова А.А."
    },
    {
      title: "Отчет 2022 2 Полугодие",
      description: "Добавил(а) Иванова А.А."
    },
    {
      title: "Отчет 2023 1 Полугодие",
      description: "Добавил(а) Иванова А.А."
    },
    {
      title: "Отчет 2023 2 Полугодие",
      description: "Добавил(а) Иванова А.А."
    },
  ];

  export const cardsData2:MyData[] = [
    {
      title: "Отчет 2020 1 Полугодие",
      description: "Добавил(а) Иванова А.А."
    },
    {
      title: "Отчет 2020 2 Полугодие",
      description: "Добавил(а) Иванова А.А."
    },
    {
      title: "Отчет 2020 1 Полугодие",
      description: "Добавил(а) Иванова А.А."
    },
    {
      title: "Отчет 2020 2 Полугодие",
      description: "Добавил(а) Иванова А.А."
    },
  ];

  export function getCardsData(typeTask: string|number ):MyData[] {

    return (typeTask == 'Активные') ? cardsData1 : cardsData2
  }