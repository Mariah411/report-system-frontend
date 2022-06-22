import { Button, Card, Form, Layout, PageHeader, Table, Tag } from "antd";
import { Content } from "antd/lib/layout/layout";
import { ColumnsType } from "antd/lib/table";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import PlaceForm from "../components/forms/PlaceForm";
import UserForm from "../components/forms/UserForm";
import ModalWithForm from "../components/ModalWithForm";
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
      setData(response.data);
    };

    const getPlacesData = async () => {
      const response = await axios.get<IPlace[]>("./places.json");
      setPlacesData(response.data);
    };
    getPlacesData();

    getData();
  }, []);

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

  const [UserModVisible, setUserModVisible] = useState(false);
  const [PlaceModVisible, setPlaceModVisible] = useState(false);

  const showModalUser = () => {
    setUserModVisible(true);
  };
  const showModalPlace = () => {
    setPlaceModVisible(true);
  };

  // добавление пользователя
  const onCreateUser = (values: any) => {
    console.log("Созданный пользователь: ", values);
    setUserModVisible(false);
  };

  // добавление учреждения
  const onCreatePlace = (values: any) => {
    console.log("Учреждение: ", values);
    setPlaceModVisible(false);
  };

  const [formUser] = Form.useForm();
  const [formPlace] = Form.useForm();

  const onSearch = (value: string) => console.log(value);

  return (
    <Layout className="site-layout layout_m">
      <Content className="content content_m-20">
        <PageHeader
          ghost={false}
          title="Управление системой"
          subTitle="Пользователи системы"
          extra={[
            <Button type="primary" onClick={showModalUser}>
              Добавить нового пользователя
            </Button>,
          ]}
        />
        <Card>
          <Form form={editForm} component={false}>
            <Table
              className="table-striped-rows"
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
            <Button type="primary" onClick={showModalPlace}>
              Добавить учреждение
            </Button>,
          ]}
        />

        <Card>
          <Table
            className="table-striped-rows"
            columns={cols2}
            size="middle"
            dataSource={placesData}
            rowKey={(record) => record.id}
          />
        </Card>

        <ModalWithForm
          title="Новый пользователь системы"
          isVisible={UserModVisible}
          form={formUser}
          setVisible={setUserModVisible}
          onCreate={onCreateUser}
        >
          <UserForm form={formUser} places={placesData} />
        </ModalWithForm>

        <ModalWithForm
          title="Новое учреждение"
          isVisible={PlaceModVisible}
          form={formPlace}
          setVisible={setPlaceModVisible}
          onCreate={onCreatePlace}
        >
          <>
            {/* <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} /> */}
            <PlaceForm form={formPlace} />
          </>
        </ModalWithForm>
      </Content>
    </Layout>
  );
};

export default SettingsPage;
