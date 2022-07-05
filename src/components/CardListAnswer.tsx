import { Card } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { FC } from "react";
import { useTypedSelector } from "../hooks/useTypedSelectror";
import { IAnswerItem } from "../models/IAnswer";
import { IProgrammReport } from "../models/IProgram";
import { ITaskPlaces } from "../models/ITaskPlaces";
import AreaReportForm from "./forms/reportForms/AreaReportForm";
import ProgramsReportForm from "./forms/reportForms/ProgramsReportForm";
import SchoolReportForm from "./forms/reportForms/SchoolReportForm";
import EllipsisText from "./UI/EllipsisText";

type Props = {
  arr: ITaskPlaces[];
  type: number;
  // answerItems: IAnswerItem[];
  // setAnswerItems: (arg: IAnswerItem[]) => void;
  //tableData?: IProgramAnswer[];
};

const CardListAnswer: FC<Props> = (props: Props) => {
  const { arr, type } = props;

  //const [form] = useForm();

  const renserChildForm = (item: ITaskPlaces) => {
    // let answerItem = answer.find((answIt) => answIt.place_id === item.id);
    // const setAnswerItem = (value: IAnswerItem) => {
    //   answerItem = value;
    // };

    switch (type) {
      case 1:
        return <AreaReportForm place_id={item.id} />;
      case 2:
        return <SchoolReportForm place_id={item.id} />;
      case 3:
        return (
          <ProgramsReportForm place_id={item.id} programs={item.programms} />
        );
    }
    return <>Произошла ошибка при загрузке формы</>;
  };

  const isContent = arr.length > 0;
  return isContent ? (
    <>
      {arr.map((item) => (
        <Card key={item.id} title={<EllipsisText>{item.name}</EllipsisText>}>
          {renserChildForm(item)}
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
