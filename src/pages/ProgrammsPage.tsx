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
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { FC, useState } from "react";
import { columns, data } from "../data/tableData";

const ProgrammsPage: FC = () => {
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

  const handleOk = () => {
    setIsModalVisible(false);
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
    <Layout className="site-layout layout_m-300">
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
            <Input />
          </Form.Item>

          <Form.Item name="age" label="возраст" rules={myRules}>
            <Input />
          </Form.Item>

          <Form.Item
            name="modifier"
            className="collection-create-form_last-form-item"
          >
            <Radio.Group>
              <Radio value="public">Public</Radio>
              <Radio value="private">Private</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ProgrammsPage;
