import {
  Layout,
  Slider,
  Menu,
  Button,
  Badge,
  Card,
  List,
  Segmented,
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

/*страница заданий*/

const TasksPage: FC = () => {
  const [tasks, setTasks] = useState<MyData[]>([]);

  const [typeTask, setTypeTask] = useState<string | number>("Активные");

  const user: IUser = useTypedSelector(state => state.auth.user)


  //let buttonsArr:IMenuButton[] = getButtonsMenu(user)
  
 /* useEffect(() => {
    buttonsArr = getButtonsMenu(user)
    console.log('отработал useeffect')
    console.log(buttonsArr)
  }, [user])

// buttonsArr = getButtonsMenu(user)

 /* console.log("Меню загрузилось")
  console.log(`Пользователь ${user.fio}`)
  console.log(buttonsArr)

  useEffect(() => {
    buttonsArr = getButtonsMenu(user)
    console.log('отработал useeffect')
    console.log(buttonsArr)
  }, [user])
  */

 // <MySider />
  return (
   
      
      <Layout
        className="site-layout"
        style={{
          marginLeft: 300,
        }}
      >
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}>
            <Segmented
              options={["Активные", "Архив отчетов"]}
              value={typeTask}
              onChange={(e) => setTypeTask(e)}
            />

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
        </Content>
      </Layout>
  
  );
};

export default TasksPage;
