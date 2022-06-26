import {
  Layout,
  Slider,
  Menu,
  Button,
  Badge,
  Card,
  List,
  Segmented,
  PageHeader,
} from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { stringify } from "querystring";

import React, { FC, useEffect, useState } from "react";
import CardList from "../components/CardList";
import MySider from "../components/UI/MySider";
import MySlider from "../components/UI/MySider";
import { useTypedSelector } from "../hooks/useTypedSelectror";
import { IMenuButton } from "../models/IMenuButton";
import { IUser } from "../models/IUser";
//import { getButtonsMenu } from "../data/buttonsData";

import { cardsData1, cardsData2, getCardsData } from "../data/cardsData";
import { MyData } from "../data/cardsData";
import ModalWithForm from "../components/ModalWithForm";
import { useForm } from "antd/lib/form/Form";
import TaskForm from "../components/forms/TaskForm";
import { checkRoles } from "../utils/checkRoles";

/*страница заданий*/

const TasksPage: FC = () => {
  const [tasks, setTasks] = useState<MyData[]>([]);

  const [typeTask, setTypeTask] = useState<string | number>("Активные");

  const user: IUser = useTypedSelector((state) => state.auth.user);

  const isAdmin: boolean = checkRoles(user, "ADMIN");

  // const isAdmin = user.roles.includes("admin");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const [form] = useForm();

  // добавление программы (изменить)
  const onCreate = (values: any) => {
    console.log("Задание для добавления: ", values);
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
                  <Button type="primary" onClick={showModal}>
                    Добавить программу
                  </Button>,
                ]
              }
            />
            <div className="cards-container">
              <Segmented
                className="my_segment"
                options={["Активные", "Архив отчетов"]}
                value={typeTask}
                onChange={(e) => setTypeTask(e)}
              />
            </div>
          </Card>

          <div className="cards-container">
            {typeTask === "Активные" ? (
              <CardList
                data={cardsData1}
                buttonText="Добавить отчет"
                typeTask={typeTask.toString()}
              />
            ) : (
              <CardList
                data={cardsData2}
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
