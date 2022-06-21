import {
  Button,
  Card,
  Col,
  Form,
  Layout,
  Popconfirm,
  Row,
  Typography,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import Table from "antd/lib/table";
import React, { FC, useEffect, useState } from "react";
import DirectionService from "../api/DirectionsServise";
import ProgramsService from "../api/ProgramsServise";
import ProgramForm from "../components/forms/ProgramForm";
import ModalWithForm from "../components/ModalWithForm";
import { columns, IProgramDataType } from "../data/tableData";
import { IDirection } from "../models/IDirection";

const ProgrammsPage: FC = () => {
  const [directionsArr, setDirections] = useState<IDirection[]>([]);
  const [programmsData, setProgrammsData] = useState<IProgramDataType[]>([]);

  // получение списка направлений и программ
  useEffect(() => {
    const getDirectionsData = async () => {
      const response = await DirectionService.getDirections();
      setDirections(response.data);
    };

    const getProgrammsData = async () => {
      const response = await ProgramsService.getProgramms();
      const newData: IProgramDataType[] = response.data.map((val, index) => {
        return { key: index + 1, ...val };
      });
      setProgrammsData(newData);
      // setProgramms(response.data);
    };

    getDirectionsData();
    getProgrammsData();
  }, []);

  console.log(programmsData);

  // удаление программы (изменить)

  const handleDelete = (key: React.Key) => {
    const newData = programmsData.filter((item) => item.key !== key);
    setProgrammsData(newData);
  };

  const myColumns = [
    ...columns,
    {
      title: "",
      dataIndex: "operator",
      render: (_: any, record: { key: React.Key }) =>
        programmsData.length >= 1 ? (
          <Popconfirm
            title="Вы уверены?"
            onConfirm={() => {
              console.log(record);
              handleDelete(record.key);
            }}
          >
            <Button>Удалить</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // добавление программы (изменить)
  const onCreate = (values: any) => {
    console.log("Программа для добавления: ", values);
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  return (
    <Layout className="site-layout layout_m">
      <Content className="content content_m-20">
        <Card>
          <Row align="middle" justify="space-between">
            <Col>
              <Typography.Title level={3}>
                Список образовательных программ
              </Typography.Title>
            </Col>
            <Col>
              <Button type="primary" onClick={showModal}>
                Добавить программу
              </Button>
            </Col>
          </Row>
        </Card>
        <Card>
          <Table
            columns={myColumns}
            size="middle"
            dataSource={programmsData}
            rowKey={(record) => record.key}
          />
        </Card>

        <ModalWithForm
          title="Новая образовательная программа"
          isVisible={isModalVisible}
          form={form}
          setVisible={setIsModalVisible}
          onCreate={onCreate}
        >
          <ProgramForm form={form} directions={directionsArr} />
        </ModalWithForm>
      </Content>
    </Layout>
  );
};

export default ProgrammsPage;
