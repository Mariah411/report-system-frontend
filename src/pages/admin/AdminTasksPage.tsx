import React, { FC } from "react";
import { adminRouteNames } from "../../router/adminRouteNames";
import TasksPage from "../TasksPage";

const AdminTasksPage: FC = () => {
  return (
    <TasksPage
      title="Все отчеты"
      isButton={true}
      SegmentOptions={["Активные задания", "Архив отчетов"]}
      buttonsText={["Посмотреть отчет", "Скачать отчет"]}
      links={[adminRouteNames.REPORT_ID, adminRouteNames.REPORT_ID]}
    />
  );
};

export default AdminTasksPage;
