import {
  Card,
  Layout,
  message,
  PageHeader,
  Segmented,
  Spin,
  Steps,
  Table,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { AxiosResponse } from "axios";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskService from "../../api/TaskServise";
import StepsButtons from "../../components/StepsButtons";
import { ITableData } from "../../models/ITableData";

const ReportPage: FC = () => {
  const { id } = useParams();

  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (id) {
      setTitle(localStorage.getItem(id) || "");
    }
  }, []);

  // const steps = [
  //   {
  //     key: 1,
  //     title: "Отчет по районам",
  //     content: <Card>Таблица районов</Card>,
  //   },
  //   {
  //     key: 2,
  //     title: "Отчет по учреждениям",
  //     content: <Card>Таблица учреждений</Card>,
  //   },
  //   {
  //     key: 3,
  //     title: "Отчет по образовательным программам",
  //     content: <Card title="Данные по программам">Таблица программ</Card>,
  //   },
  // ];

  const [current, setCurrent] = useState("1");

  const segments = [
    { label: "Отчет по районам", value: "1" },
    { label: "Отчет по учреждениям", value: "2" },
    { label: "Отчет по программам", value: "3" },
  ];

  const [table1, setTable1] = useState<ITableData>({ columns: [], data: [] });
  const [table2, setTable2] = useState<ITableData>({ columns: [], data: [] });
  const [table3, setTable3] = useState<ITableData>({ columns: [], data: [] });

  // const [tableCols, setTableCols] = useState({ 1: [], 2: [], 3: []})
  // const[tableData, setTableData] = useState({1:[], 2: [], 3: []})

  const [isLoading, setIsLoading] = useState(false);
  const setError = () => {
    message.error("Произошла ошибка при загрузке данных");
  };

  const fixColumn = (response: AxiosResponse<ITableData>) => {
    const newColumns = [...response.data.columns];
    newColumns[0] = { ...newColumns[0], fixed: "left", width: 150 };
    return { columns: newColumns, data: response.data.data };
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      if (id) {
        TaskService.getReport(id, 1)
          .then((response) => {
            const newData = fixColumn(response);
            console.log(newData);
            setTable1(newData);
            // setTable1(response.data);
          })
          .catch(setError);
        TaskService.getReport(id, 2)
          .then((response) => {
            setTable2(response.data);
          })
          .catch(setError);
        TaskService.getReport(id, 3)
          .then((response) => {
            setTable3(response.data);
          })
          .catch(setError);
      } else {
        message.error("Задания с таким id нет");
      }
    };

    getData().finally(() => setIsLoading(false));
  }, []);

  const SegmentContent = [
    {
      value: "1",
      content: (
        <Table
          columns={table1.columns}
          dataSource={table1.data}
          scroll={{ x: 1500 }}
        ></Table>
      ),
    },
    {
      value: "2",
      content: (
        <Table columns={table2.columns} dataSource={table2.data}></Table>
      ),
    },
    {
      value: "3",
      content: (
        <Table columns={table3.columns} dataSource={table3.data}></Table>
      ),
    },
  ];

  return (
    <Layout className="site-layout layout_m">
      <Content className="content_m-20">
        <div className="site-layout-background" style={{ padding: 24 }}>
          <Card>
            <PageHeader onBack={() => null} title={title} />
            <Segmented
              options={segments}
              size="large"
              block
              value={current}
              onChange={(value) => setCurrent(value.toString())}
            />
            {/* <Steps current={current}>
              {steps.map((item) => (
                <Steps.Step key={item.key} title={item.title} />
              ))}
            </Steps> */}
          </Card>
          {/* {steps[current].content} */}
          <Spin spinning={isLoading}>
            {SegmentContent[+current - 1].content}
          </Spin>

          {/* <StepsButtons
            steps={steps}
            current={current}
            setCurrent={setCurrent}
          /> */}

          <div>ReportPage {id}</div>
        </div>
      </Content>
    </Layout>
  );
};

export default ReportPage;
