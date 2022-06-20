import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  PageHeader,
  Row,
  Table,
  Tag,
  Typography,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import { Content } from "antd/lib/layout/layout";
import { ColumnsType } from "antd/lib/table";
import Search from "antd/lib/transfer/search";
import axios from "axios";
import { userInfo } from "os";
import React, { FC, useEffect, useState } from "react";
import ModalWithForm from "../components/ModalWithForm";
import SelectSearchMultiply from "../components/SelectSearchMultiply";
import { IPlace } from "../models/IPlace";
import { IProgram } from "../models/IProgram";
//import { cols } from "../data/tableUsersData";
import { IUser } from "../models/IUser";

const SettingsPage: FC = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [placesData, setPlacesData] = useState<IPlace[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get<IUser[]>("./users.json");
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

  const renderArrayTags = (array: IPlace[]) => {
    {
      return array.map((item) => (
        <Tag color="purple" key={item.id}>
          {item.name}
        </Tag>
      ));
    }
  };

  const renderStringTags = (array: string[]) => {
    {
      return array.map((item) => (
        <Tag color="geekblue" key={item}>
          {item}
        </Tag>
      ));
    }
  };

  // колонки
  const cols1: ColumnsType<IUser> = [
    {
      title: "ФИО",
      dataIndex: "fio",
      key: "fio",
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      width: "15%",
      render: (roles: string[]) => <>{renderStringTags(roles)}</>,
    },
    {
      title: "Места",
      dataIndex: "places",
      key: "places",
      width: "25%",
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
          <>{renderArrayTags(places)}</>
        );
      },
    },

    {
      title: "",
      dataIndex: "",
      width: "10%",
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

  const cols2: ColumnsType<IPlace> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Название района/учреждения",
      dataIndex: "name",
      key: "name",
    },
  ];

  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const showModal1 = () => {
    setIsModalVisible1(true);
  };
  const showModal2 = () => {
    setIsModalVisible2(true);
  };

  // добавление пользователя
  const onCreateUser = (values: any) => {
    console.log("Созданный пользователь: ", values);
    setIsModalVisible1(false);
  };

  // добавление учреждения
  const onCreatePlace = (values: any) => {
    console.log("Учреждение: ", values);
    setIsModalVisible2(false);
  };

  const [formUser] = Form.useForm();
  const [formPlace] = Form.useForm();

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

  const onSearch = (value: string) => console.log(value);

  return (
    <Layout className="site-layout layout_m">
      <Content className="content content_m-20">
        <PageHeader
          ghost={false}
          title="Управление системой"
          subTitle="Пользователи системы"
          extra={[
            <Button type="primary" onClick={showModal1}>
              Добавить нового пользователя
            </Button>,
          ]}
        />
        <Card>
          <Form form={editForm} component={false}>
            <Table
              columns={cols1}
              size="middle"
              dataSource={data}
              rowKey={(record) => record.id}
            />
          </Form>
        </Card>

        <PageHeader
          ghost={false}
          title="Список учреждений"
          subTitle="Учреждения ДО Белгородской области"
          extra={[
            <Button type="primary" onClick={showModal2}>
              Добавить учреждение
            </Button>,
          ]}
        />

        <Card>
          <Table
            columns={cols2}
            size="middle"
            dataSource={placesData}
            rowKey={(record) => record.id}
          />
        </Card>

        <ModalWithForm
          title="Новый пользователь системы"
          isVisible={isModalVisible1}
          form={formUser}
          setVisible={setIsModalVisible1}
          onCreate={onCreateUser}
        >
          <Form form={formUser} layout="vertical" name="form_in_modal">
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
                form={formUser}
                selectedValues={[]}
              />
            </Form.Item>
          </Form>
        </ModalWithForm>

        <ModalWithForm
          title="Новое учреждение"
          isVisible={isModalVisible2}
          form={formPlace}
          setVisible={setIsModalVisible2}
          onCreate={onCreatePlace}
        >
          <>
            {/* <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} /> */}
            <Form form={formPlace} layout="vertical" name="form_in_modal">
              <Form.Item
                name="name"
                label="Название учреждения"
                rules={myRules}
              >
                <Input />
              </Form.Item>
            </Form>
          </>
        </ModalWithForm>
      </Content>
    </Layout>
  );
};

export default SettingsPage;
