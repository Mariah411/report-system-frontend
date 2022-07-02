import React, { FC } from "react";
import TasksPage from "./TasksPage";

const AdminTasksPage: FC = () => {
  return (
    <TasksPage
      title="Все отчеты"
      isButton={true}
      SegmentOptions={["Активные задания", "Архив отчетов"]}
      buttonsText={["Посмотреть отчет", "Скачать отчет"]}
    />
  );
};

export default AdminTasksPage;
