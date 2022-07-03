import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card, List } from "antd";
import { cardsData1, cardsData2, MyData } from "../data/cardsData";
import { Link } from "react-router-dom";
import { TaskUser } from "../models/ITask";
import { adminRouteNames } from "../router/adminRouteNames";
import { userRouteNames } from "../router/userRouteNames";

type Props = {
  data: TaskUser[];
  buttonText: string;
  typeTask: string;
  link: adminRouteNames | userRouteNames | string;
};

const CardList = (props: Props) => {
  useEffect(() => {
    props.data.forEach((item) =>
      localStorage.setItem(
        `${item.id}`,
        `Отчет за ${item.year} год, ${item.half_year}-e полугодие`
      )
    );
  }, []);
  let temp_link = props.link.replace(":id", "");
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={props.data}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Card
            title={`Отчет за ${item.year} год, ${item.half_year}-e полугодие`}
            extra={
              <Link to={`${temp_link}${item.id}`}>
                <Button type="primary">{props.buttonText}</Button>
              </Link>
            }
          >
            {`Добавил(а) ${item.account.FIO}`}
          </Card>
        </List.Item>
      )}
    />
  );
};

export default CardList;
