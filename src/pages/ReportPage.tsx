import { Button, Card, Layout, message, Steps } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Content } from "antd/lib/layout/layout";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgramsService from "../api/ProgramsServise";
import AreaReportForm from "../components/forms/AreaReportForm";
import ProgramsReportForm from "../components/forms/ProgramsReportForm";
import SchoolReportForm from "../components/forms/SchoolReportForm";
import StepsButtons from "../components/StepsButtons";
import { IProgramDataType } from "../data/tableData";

const ReportPage: FC = () => {
  const { id } = useParams();

  const [programmsData, setProgrammsData] = useState<IProgramDataType[]>([]);

  useEffect(() => {
    const getProgrammsData = async () => {
      const response = await ProgramsService.getProgramms();
      const newData: IProgramDataType[] = response.data.map((val, index) => {
        return { key: index + 1, ...val };
      });
      setProgrammsData(newData);
    };
    getProgrammsData();
  }, []);

  const [formArea] = useForm();
  const [formSchool] = useForm();
  const [formPrograms] = useForm();

  const steps = [
    {
      title: "Отчет по районам",
      content: (
        <Card title="Алексеевский район">
          <AreaReportForm form={formArea} />
        </Card>
      ),
    },
    {
      title: "Отчет по учреждениям",
      content: (
        <Card title="«Станция  юных техников» Алексеевского городского округа">
          <SchoolReportForm form={formSchool} />
        </Card>
      ),
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
          <Card>
            <Steps current={current}>
              {steps.map((item) => (
                <Steps.Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </Card>

          {steps[current].content}
          <StepsButtons
            steps={steps}
            current={current}
            setCurrent={setCurrent}
          />
        </div>
      </Content>
      <div>ReportPage {id}</div>
    </Layout>
  );
};

export default ReportPage;
