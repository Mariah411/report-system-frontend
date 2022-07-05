import { Card, Layout, message, PageHeader, Steps } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Content } from "antd/lib/layout/layout";
import { AxiosResponse } from "axios";
import { FormInstance } from "rc-field-form/lib/interface";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskService from "../../api/TaskServise";
import CardListAnswer from "../../components/CardListAnswer";
import StepsButtons from "../../components/StepsButtons";
import { IProgramDataType } from "../../data/tableData";

import { IAnswerItem } from "../../models/IAnswer";
import { ITaskPlaces } from "../../models/ITaskPlaces";

const AnswerPage: FC = () => {
  const { id } = useParams();

  const [places, setPlaces] = useState<ITaskPlaces[]>([]);
  const [areas, setAreas] = useState<ITaskPlaces[]>([]);
  const [schools, setSchools] = useState<ITaskPlaces[]>([]);

  const [answerForm] = useForm();

  const [answerItems, setAnswerItems] = useState<IAnswerItem[]>([]);

  const getAreas = (response: AxiosResponse<ITaskPlaces[]>) => {
    return response.data.filter((item) => item.place_type.id === 1);
  };

  const getSchools = (response: AxiosResponse<ITaskPlaces[]>) => {
    return response.data.filter((item) => item.place_type.id === 2);
  };

  const setAnswerItemsForPlaces = (places: ITaskPlaces[]) => {
    let newAnswerItems: IAnswerItem[] = [];
    places.forEach((place) => {
      newAnswerItems.push({
        place_id: place.id,
        place_data: [],
        programm_data: [],
      });
    });
    setAnswerItems(newAnswerItems);
  };

  useEffect(() => {
    const getData = async () => {
      if (id) {
        TaskService.getReportPlaces(id).then((response) => {
          setAreas(getAreas(response));
          setSchools(getSchools(response));
          setPlaces(response.data);
          setAnswerItemsForPlaces(response.data);
        });
      }
    };

    getData();
  }, []);

  const sendData = () => {
    message.success("Отчет отправлен!");
  };

  //const formsArray = useFormArray(places);

  // places.forEach((place) => {
  //   const [form] = useForm();
  //   formsArray.push({ id: place.id, place_form: form });
  // });

  //console.log(formsArray);

  // const [formArea] = useForm();
  // const [formSchool] = useForm();
  // const [formPrograms] = useForm();

  const steps = [
    {
      title: "Отчет по районам",
      content: (
        <CardListAnswer
          answerItems={answerItems}
          setAnswerItems={setAnswerItems}
          arr={areas}
          type={1}
        />
      ),
    },
    {
      title: "Отчет по учреждениям",
      content: (
        <CardListAnswer
          answerItems={answerItems}
          setAnswerItems={setAnswerItems}
          arr={schools}
          type={2}
        />
      ),
    },
    {
      title: "Отчет по образовательным программам",
      content: (
        <CardListAnswer
          answerItems={answerItems}
          setAnswerItems={setAnswerItems}
          arr={schools}
          type={3}
        />
      ),
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <Layout className="layout_m">
      <Content className="content_m-20">
        <div className="forms-container">
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Отчет 2022 1 полугодие"
          />

          <Card>
            <Steps current={current}>
              {steps.map((item) => (
                <Steps.Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </Card>

          {steps[current].content}
          <StepsButtons
            Click={sendData}
            steps={steps}
            current={current}
            setCurrent={setCurrent}
          />
        </div>
      </Content>
      <div>AnswerPage {id}</div>
    </Layout>
  );
};

export default AnswerPage;
