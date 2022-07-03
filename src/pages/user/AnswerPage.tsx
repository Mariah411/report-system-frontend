import { Button, Card, Layout, message, PageHeader, Steps } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Content } from "antd/lib/layout/layout";
import { AxiosResponse } from "axios";
import { execPath } from "process";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgramsService from "../../api/ProgramsServise";
import TaskService from "../../api/TaskServise";
import CardListAnswer from "../../components/CardListAnswer";
import AreaReportForm from "../../components/forms/reportForms/AreaReportForm";
import ProgramsReportForm from "../../components/forms/reportForms/ProgramsReportForm";
import SchoolReportForm from "../../components/forms/reportForms/SchoolReportForm";
import StepsButtons from "../../components/StepsButtons";
import EllipsisText from "../../components/UI/EllipsisText";
import { IProgramDataType } from "../../data/tableData";
import { ITaskPlaces } from "../../models/ITaskPlaces";

const AnswerPage: FC = () => {
  const { id } = useParams();

  const [programmsData, setProgrammsData] = useState<IProgramDataType[]>([]);
  const [areas, setAreas] = useState<ITaskPlaces[]>([]);
  const [schools, setSchools] = useState<ITaskPlaces[]>([]);

  const getAreas = (response: AxiosResponse<ITaskPlaces[]>) => {
    return response.data.filter((item) => item.place_type.id === 1);
  };

  const getSchools = (response: AxiosResponse<ITaskPlaces[]>) => {
    return response.data.filter((item) => item.place_type.id === 2);
  };

  // const getProgramms = (response: AxiosResponse<ITaskPlaces[]>) => {
  //   response.data.fo
  // }

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const response = TaskService.getReportPlaces(id).then((response) => {
          setAreas(getAreas(response));
          setSchools(getSchools(response));
        });
      }
    };

    getData();
    // const getProgrammsData = async () => {
    //   const response = await ProgramsService.getProgramms();
    //   const newData: IProgramDataType[] = response.data.map((val, index) => {
    //     return { key: index + 1, ...val };
    //   });
    //   setProgrammsData(newData);
    // };
    // getProgrammsData();
  }, []);

  const sendData = () => {
    message.success("Отчет отправлен!");
  };
  const [formArea] = useForm();
  const [formSchool] = useForm();
  const [formPrograms] = useForm();

  const steps = [
    {
      title: "Отчет по районам",
      content: <CardListAnswer arr={areas} type={1} />,
    },
    {
      title: "Отчет по учреждениям",
      content: <CardListAnswer arr={schools} type={2} />,
    },
    {
      title: "Отчет по образовательным программам",
      content: (
        <Card title="Данные по программам">
          <ProgramsReportForm form={formPrograms} programs={programmsData} />
        </Card>
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
