import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import Table, { ColumnsType } from "antd/lib/table";
import axios from "axios";
import React, { FC, useState } from "react";
import DirectionService from "../api/DirectionsServise";
import { directions } from "../data/directionsData";
import { columns, data } from "../data/tableData";
import { IDirection } from "../models/IDirection";

const ProgrammsPage: FC = () => {
  /*  const directions = axios
    .get<IDirection[]>("./directions.json")
    .then((response) => response.data)
    .then((d) => d);

  console.log(directions);*/
  const [directionsArr, setDirections] = useState(directions);

  //console.log(directionsArr);

  const myColumns = [
    ...columns,
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: () => <Button>Удалить</Button>,
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
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
          <Table columns={myColumns} size="middle" dataSource={data} />
        </Card>

        <Modal
          title="Новая образовательная программа"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Добавить"
          cancelText="Отмена"
        >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{ modifier: "public" }}
          >
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
              name="modifier"
              className="collection-create-form_last-form-item"
            >
              <Radio.Group>
                <Radio value="public">ДО(О)П</Radio>
                <Radio value="private">АДО(О)П</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ProgrammsPage;
