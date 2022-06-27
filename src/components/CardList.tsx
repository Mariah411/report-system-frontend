import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card, List } from "antd";
import { cardsData1, cardsData2, MyData } from "../data/cardsData";
import { Link } from "react-router-dom";
import { TaskUser } from "../models/ITask";

type Props = { data: TaskUser[]; buttonText: string; typeTask: string };

const CardList = (props: Props) => {
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
              <Link to={`/tasks/${item.id}`}>
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
