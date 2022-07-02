import React, { FC } from "react";
import TasksPage from "./TasksPage";

const MyTasksPage: FC = () => {
  return (
    <TasksPage
      title="Мои отчеты"
      isButton={false}
      SegmentOptions={["Активные задания", "Мои отчеты"]}
      buttonsText={["Добавить", "Посмотреть отчет"]}
    />
  );
};

export default MyTasksPage;
