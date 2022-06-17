import {
  Button,
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { FC, useState } from "react";
import { columns, data } from "../data/tableEventsData";

const EventPage: FC = () => {
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
              <Typography.Title level={3}>Мероприятия</Typography.Title>
            </Col>
            <Col>
              <Button type="primary" onClick={showModal}>
                Добавить мероприятие
              </Button>
            </Col>
          </Row>
        </Card>
        <Card>
          <Table columns={columns} size="middle" dataSource={data} />
        </Card>

        <Modal
          title="Новая мероприятие"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Добавить"
          cancelText="Отмена"
        >
          <Form form={form} layout="vertical" name="form_in_modal">
            <Form.Item name="name" label="Название мероприятия" rules={myRules}>
              <Input />
            </Form.Item>
            <Form.Item name="school" label="Учреждение" rules={myRules}>
              <Input />
            </Form.Item>
            <Form.Item name="date" label="Дата проведения" rules={myRules}>
              <DatePicker />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default EventPage;
