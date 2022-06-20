import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import Table, { ColumnsType } from "antd/lib/table";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { render } from "react-dom";
import DirectionService from "../api/DirectionsServise";
import ProgramsService from "../api/ProgramsServise";
import ModalWithForm from "../components/ModalWithForm";
import { columns, IProgramDataType } from "../data/tableData";
import { IDirection } from "../models/IDirection";
import { IProgram } from "../models/IProgram";
import { IUser } from "../models/IUser";

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

  const myRules = [
    {
      required: true,
      message: "Поле обязательно для заполнения",
    },
  ];

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
          <Form form={form} layout="vertical" name="form_in_modal">
            <Form.Item name="name" label="Название" rules={myRules}>
              <Input />
            </Form.Item>
            <Form.Item name="school" label="Учреждение" rules={myRules}>
              <Input />
            </Form.Item>

            <Form.Item name="direction" label="Направление" rules={myRules}>
              <Select>
                {directionsArr.map((direction) => (
                  <Select.Option value={direction.id}>
                    {direction.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="age" label="Возраст" rules={myRules}>
              <Input />
            </Form.Item>

            <Form.Item
              name="programm_type"
              className="collection-create-form_last-form-item"
            >
              <Radio.Group>
                <Radio value="1">ДО(О)П</Radio>
                <Radio value="2">АДО(О)П</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </ModalWithForm>
      </Content>
    </Layout>
  );
};

export default ProgrammsPage;
