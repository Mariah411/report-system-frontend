import { Button, Card, Layout, message, PageHeader, Segmented } from "antd";
import { Content } from "antd/lib/layout/layout";

import { FC, useEffect, useState } from "react";
import CardList from "../components/CardList";
import { useTypedSelector } from "../hooks/useTypedSelectror";
import { IUser } from "../models/IUser";
//import { getButtonsMenu } from "../data/buttonsData";

import { useForm } from "antd/lib/form/Form";
import TaskService from "../api/TaskServise";
import TaskForm from "../components/forms/TaskForm";
import ModalWithForm from "../components/ModalWithForm";
import { TaskUser } from "../models/ITask";
import { checkRoles } from "../utils/checkRoles";

/*страница заданий*/

const TasksPage: FC = () => {
  const [typeTask, setTypeTask] = useState<string | number>("Активные");

  const user: IUser = useTypedSelector((state) => state.auth.user);

  const isAdmin: boolean = checkRoles(user, "ADMIN");

  const [isModalVisible, setIsModalVisible] = useState(false);
  //const [tasks, setTasks] = useState();

  const [activeTasks, setActiveTasks] = useState<TaskUser[]>([]);
  const [doneTasks, setDoneTasks] = useState<TaskUser[]>([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const [form] = useForm();

  useEffect(() => {
    const getTasks = async () => {
      const response = await TaskService.getTasks();
      const active = response.data.filter((task) => task.done === false);
      const done = response.data.filter((task) => task.done === true);
      setActiveTasks(active);
      setDoneTasks(done);
    };

    getTasks();
  }, []);

  // добавление задания (изменить)
  const onCreate = async (values: { half_year: number; year: number }) => {
    const { half_year, year } = values;
    // form.setFieldsValue({ account_id: user.id });
    //console.log(user.id);
    try {
      const response = await TaskService.addTask(+half_year, year, user.id);
      form.resetFields();
      message.success("Задание успешно добавлено");
    } catch (e) {
      message.error("Произошла ошибка при добавлении");
    }

    setIsModalVisible(false);
  };

  return (
    <Layout className="site-layout layout_m">
      <Content className="content_m-20">
        <div className="site-layout-background" style={{ padding: 24 }}>
          <Card>
            <PageHeader
              onBack={() => null}
              title="Задания"
              subTitle="Активные задания, архив отчетов"
              extra={
                isAdmin && [
                  <Button key="1" type="primary" onClick={showModal}>
                    Добавить задание
                  </Button>,
                ]
              }
            />
            <div className="cards-container">
              <Segmented
                className="my_segment"
                options={["Активные", "Мои ответы"]}
                value={typeTask}
                onChange={(e) => setTypeTask(e)}
              />
            </div>
          </Card>

          <div className="cards-container">
            {/* <CardList
              data={tasks}
              buttonText="Добавить отчет"
              typeTask={typeTask.toString()}
            /> */}

            {typeTask === "Активные" ? (
              <CardList
                data={activeTasks}
                buttonText="Добавить отчет"
                typeTask={typeTask.toString()}
              />
            ) : (
              <CardList
                data={doneTasks}
                buttonText="Посмотреть отчет"
                typeTask={typeTask.toString()}
              />
            )}
          </div>
        </div>

        <ModalWithForm
          title="Новое задание"
          isVisible={isModalVisible}
          form={form}
          setVisible={setIsModalVisible}
          onCreate={onCreate}
        >
          <TaskForm form={form} />
        </ModalWithForm>
      </Content>
    </Layout>
  );
};

export default TasksPage;
