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
import FormItem from "antd/lib/form/FormItem";
import { Content } from "antd/lib/layout/layout";
import { ColumnsType } from "antd/lib/table";
import axios from "axios";
import { userInfo } from "os";
import React, { FC, useEffect, useState } from "react";
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
        <Tag color="purple" key={item}>
          {item}
        </Tag>
      ));
    }
  };

  const renderInput = (dataIndex: string, value: string) => {
    const inputType = dataIndex === "email" ? "email" : "text";
    return (
      <FormItem name={dataIndex}>
        <Input type={inputType} defaultValue={value} />
      </FormItem>
    );
  };
  // колонки
  const cols: ColumnsType<IUser> = [
    {
      title: "ФИО",
      dataIndex: "fio",
      key: "fio",
      render: (text, record) => {
        return record.id === editingRow ? renderInput("fio", text) : text;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => {
        return record.id === editingRow ? renderInput("email", text) : text;
      },
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      render: (roles: string[]) => <>{renderStringTags(roles)}</>,
      //       render: (roles: string[], record) => {
      //         return record.id === editingRow ? (
      //           <Form.Item name="places">
      //             <SelectSearchMultiply
      //               fieldName="places"
      //               data={[{id: 1, name: user}]}
      //               form={editForm}
      //               selectedValues={[]}
      //             />
      //           </Form.Item>
      //         ) :
      // <>{renderStringTags(roles)}</>,
      //       }
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
          <>{renderArrayTags(places)}</>
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

  interface EditingCellProps {
    record: IUser;
    data: any;
    type: "select" | "input";
    editingRow: number;
    initialValue: any | any[];
  }
  const getEditingCell = () => {};

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
          <Form form={editForm} component={false}>
            <Table
              columns={myColumns}
              size="middle"
              dataSource={data}
              rowKey={(record) => record.id}
            />
          </Form>
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
