import React, { FC } from "react";
import { userRouteNames } from "../../router/userRouteNames";
import TasksPage from "../TasksPage";

const MyTasksPage: FC = () => {
  return (
    <TasksPage
      title="Мои отчеты"
      isButton={false}
      SegmentOptions={["Активные задания", "Мои отчеты"]}
      buttonsText={["Добавить", "Посмотреть отчет"]}
      links={[userRouteNames.ANSWER_ID, userRouteNames.ANSWER_ID]}
    />
  );
};

export default MyTasksPage;
