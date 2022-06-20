import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Table,
  Tag,
  Typography,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { ColumnsType } from "antd/lib/table";
import axios from "axios";
import { userInfo } from "os";
import React, { FC, useEffect, useState } from "react";
import SelectSearchMultiply from "../components/SelectSearchMultiply";
import { IPlace } from "../models/IPlace";
//import { cols } from "../data/tableUsersData";
import { IUser } from "../models/IUser";

const SettingsPage: FC = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [placesData, setPlacesData] = useState<IPlace[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get<IUser[]>("./users.json");
      //   let newData = response.data.map((user: IUser) => ({
      //     ...user,
      //     key: user.id,
      //   }));
      //  setData(newData);
      setData(response.data);
    };

    const getPlacesData = async () => {
      const response = await axios.get<IPlace[]>("./places.json");
      setPlacesData(response.data);
    };
    getPlacesData();

    getData();
  }, []);

  //setTimeout(, 0);

  //console.log(data);

  const [editingRow, setEditingRow] = useState<number>(0);
  const [editForm] = Form.useForm();

  // колонки
  const cols: ColumnsType<IUser> = [
    { title: "ФИО", dataIndex: "fio", key: "fio" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      render: (roles: string[]) => (
        <>
          {roles.map((role) => (
            <Tag color="blue" key={role}>
              {role}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Места",
      dataIndex: "places",
      key: "places",
      render: (places: IPlace[], record) => {
        let recordPlaces: number[] = [];
        record.places.map((place) => recordPlaces.push(place.id));

        return record.id === editingRow ? (
          <Form.Item name="places">
            <SelectSearchMultiply
              fieldName="places"
              data={placesData}
              form={editForm}
              selectedValues={recordPlaces}
            />
          </Form.Item>
        ) : (
          <>
            {places.map((place) => (
              <Tag color="purple" key={place.id}>
                {place.name}
              </Tag>
            ))}
          </>
        );
      },
    },

    {
      title: "",
      dataIndex: "",
      render: (_: any, record) => (
        <Button
          onClick={() => {
            setEditingRow(record.id);
          }}
        >
          Редактировать
        </Button>
      ),
    },
  ];

  const myColumns = [...cols];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // добавление программы (изменить)
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

  const options = [
    { label: "Пользователь", value: "user" },
    { label: "Администратор", value: "admin" },
  ];

  return (
    <Layout className="site-layout layout_m">
      <Content className="content content_m-20">
        <Card>
          <Row align="middle" justify="space-between">
            <Col>
              <Typography.Title level={3}>Управление системой</Typography.Title>
            </Col>
            <Col>
              <Button type="primary" onClick={showModal}>
                Зарегестрировать нового пользователя
              </Button>
            </Col>
          </Row>
        </Card>
        <Card>
          <Table
            columns={myColumns}
            size="middle"
            dataSource={data}
            rowKey={(record) => record.id}
          />
        </Card>

        <Modal
          title="Новый пользователь системы"
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
            <Form.Item name="fio" label="ФИО" rules={myRules}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="email" rules={myRules}>
              <Input />
            </Form.Item>

            <Form.Item name="roles" label="Роли пользователя" rules={myRules}>
              <Checkbox.Group options={options} defaultValue={["user"]} />
            </Form.Item>

            <Form.Item
              name="places"
              label="Зависимые районы / учреждения"
              //rules={[...myRules, { type: "array" }]}
            >
              <SelectSearchMultiply
                fieldName="places"
                data={placesData}
                form={form}
                selectedValues={[]}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default SettingsPage;
