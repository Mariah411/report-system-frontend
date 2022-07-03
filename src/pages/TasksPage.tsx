import {
  Button,
  Card,
  Layout,
  message,
  PageHeader,
  Segmented,
  Spin,
} from "antd";
import { Content } from "antd/lib/layout/layout";

import { FC, useEffect, useState } from "react";
import CardList from "../components/CardList";
import { useTypedSelector } from "../hooks/useTypedSelectror";
import { IUser } from "../models/IUser";
//import { getButtonsMenu } from "../data/buttonsData";

import { useForm } from "antd/lib/form/Form";
import TaskService from "../api/TaskServise";
import TaskForm from "../components/forms/createForms/TaskForm";
import ModalWithForm from "../components/ModalWithForm";
import { TaskUser } from "../models/ITask";
import { checkRoles } from "../utils/checkRoles";
import { title } from "process";
import { adminRouteNames } from "../router/adminRouteNames";
import { userRouteNames } from "../router/userRouteNames";

/*страница заданий*/
type Props = {
  title: string;
  isButton: boolean;
  SegmentOptions: string[];
  buttonsText: string[];
  links: adminRouteNames[] | userRouteNames[] | string[];
};
const TasksPage: FC<Props> = (props: Props) => {
  const { title, isButton, SegmentOptions, buttonsText, links } = props;
  const [typeTask, setTypeTask] = useState<string | number>(SegmentOptions[0]);

  const user: IUser = useTypedSelector((state) => state.auth.user);

  //const isAdmin: boolean = checkRoles(user, "ADMIN");

  const [isModalVisible, setIsModalVisible] = useState(false);
  //const [tasks, setTasks] = useState();

  const [activeTasks, setActiveTasks] = useState<TaskUser[]>([]);
  const [doneTasks, setDoneTasks] = useState<TaskUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const [form] = useForm();

  useEffect(() => {
    setIsLoading(true);

    const getTasks = async () => {
      // изменить получение заданий
      const response = await TaskService.getTasks();
      const active = response.data.filter((task) => task.done === false);
      const done = response.data.filter((task) => task.done === true);
      setActiveTasks(active);
      setDoneTasks(done);
      setIsLoading(false);
    };

    getTasks();
  }, []);

  // добавление задания (изменить)
  const onCreate = async (values: { half_year: number; year: number }) => {
    const { half_year, year } = values;
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
              title={title}
              subTitle="Активные задания, архив отчетов"
              extra={
                isButton && [
                  <Button key="1" type="primary" onClick={showModal}>
                    Добавить задание
                  </Button>,
                ]
              }
            />
            <div className="cards-container">
              <Segmented
                className="my_segment"
                options={SegmentOptions}
                value={typeTask}
                onChange={(e) => setTypeTask(e)}
                size="large"
              />
            </div>
          </Card>

          <div className="cards-container">
            {/* <CardList
              data={tasks}
              buttonText="Добавить отчет"
              typeTask={typeTask.toString()}
            /> */}

            <Spin spinning={isLoading}>
              {typeTask === SegmentOptions[0] ? (
                <CardList
                  link={links[0]}
                  data={activeTasks}
                  buttonText={buttonsText[0]}
                  typeTask={typeTask.toString()}
                />
              ) : (
                <CardList
                  link={links[1]}
                  data={doneTasks}
                  buttonText={buttonsText[1]}
                  typeTask={typeTask.toString()}
                />
              )}
            </Spin>
          </div>
        </div>

        {isButton && (
          <ModalWithForm
            title="Новое задание"
            isVisible={isModalVisible}
            form={form}
            setVisible={setIsModalVisible}
            onCreate={onCreate}
          >
            <TaskForm form={form} />
          </ModalWithForm>
        )}
      </Content>
    </Layout>
  );
};

export default TasksPage;
