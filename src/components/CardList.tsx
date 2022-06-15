import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card, List } from "antd";
import { cardsData1, cardsData2, MyData } from "../data/cardsData";

type Props = { data: MyData[]; buttonText: string; typeTask: string };

const CardList = (props: Props) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={props.data}
      renderItem={(item) => (
        <List.Item>
          <Card
            title={item.title}
            extra={
              <a href="#">
                <Button type="primary">{props.buttonText}</Button>
              </a>
            }
          >
            {item.description}
          </Card>
        </List.Item>
      )}
    />
  );
};

export default CardList;
