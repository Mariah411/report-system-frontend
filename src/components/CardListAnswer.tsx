import { Card } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { FC } from "react";
import { ITaskPlaces } from "../models/ITaskPlaces";
import AreaReportForm from "./forms/reportForms/AreaReportForm";
import SchoolReportForm from "./forms/reportForms/SchoolReportForm";

type Props = {
  arr: ITaskPlaces[];
  type: number;
};

const CardListAnswer: FC<Props> = (props: Props) => {
  const [form] = useForm();
  const { arr, type } = props;

  const childForm =
    type === 1 ? (
      <AreaReportForm form={form} />
    ) : (
      <SchoolReportForm form={form} />
    );

  const isContent = arr.length > 0;
  return isContent ? (
    <>
      {arr.map((item) => (
        <Card key={item.id} title={item.name}>
          {childForm}
        </Card>
      ))}
    </>
  ) : (
    <Card>
      <h1>Добавление данных не требуется</h1>
    </Card>
  );
};

export default CardListAnswer;
