import { Button, Card, message } from "antd";
import React from "react";

type Props = {
  steps: any[];
  current: number;
  setCurrent: (arg: number) => void;
  Click?: () => void;
};

const StepsButtons = (props: Props) => {
  const { steps, current, setCurrent, Click } = props;

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Card className="steps-action">
      {current < steps.length - 1 && (
        <Button type="primary" onClick={() => next()}>
          Далее
        </Button>
      )}
      {current === steps.length - 1 && (
        <Button type="primary" onClick={Click}>
          Готово
        </Button>
      )}
      {current > 0 && (
        <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
          Назад
        </Button>
      )}
    </Card>
  );
};

export default StepsButtons;
