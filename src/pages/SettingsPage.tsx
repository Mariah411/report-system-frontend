import { Button, Card, Form, Layout, PageHeader, Table, Tag } from "antd";
import { Content } from "antd/lib/layout/layout";
import { ColumnsType } from "antd/lib/table";
import { FC, useEffect, useState } from "react";
import PlacesService from "../api/PlacesService";
import UserService from "../api/UserServise";
import PlaceForm from "../components/forms/PlaceForm";
import UserForm from "../components/forms/UserForm";
import ModalWithForm from "../components/ModalWithForm";
import SelectSearchMultiply from "../components/SelectSearchMultiply";
import { colsArea, colsSchool } from "../data/placesTableData";
import { IPlace, PlaceAdmin } from "../models/IPlace";
import { IRole } from "../models/IRole";
import { IUser } from "../models/IUser";

const SettingsPage: FC = () => {
  const [usersData, setUsersData] = useState<IUser[]>([]);
  const [placesData, setPlacesData] = useState<PlaceAdmin[]>([]);
  const [schoolsData, setSchoolsData] = useState<PlaceAdmin[]>([]);
  const [areasData, setAreasData] = useState<PlaceAdmin[]>([]);

  useEffect(() => {
    const getUsersData = async () => {
      const response = await UserService.getAllUsers();
      setUsersData(response.data);
    };

    const getPlacesData = async () => {
      const response = await PlacesService.getPlaces();
      setPlacesData(response.data);
    };

    const getSchoolsData = async () => {
      const response = await PlacesService.getSchools();
      setSchoolsData(response);
    };

    const getAreaData = async () => {
      const response = await PlacesService.getAreas();
      setAreasData(response);
    };

    getPlacesData();
    getSchoolsData();
    getUsersData();
    getAreaData();
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

  const renderStringTags = (array: { id: number; name: string }[]) => {
    {
      return array.map((item) => (
        <Tag color="geekblue" key={item.id}>
          {item.name}
        </Tag>
      ));
    }
  };

  // колонки
  const cols1: ColumnsType<IUser> = [
    {
      title: "ФИО",
      dataIndex: "FIO",
      key: "FIO",
      width: "25%",
    },

    {
      title: "Email",
      dataIndex: "mail",
      key: "mail",
      width: "25%",
    },
    {
      title: "Пароль",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      width: "15%",
      render: (roles: IRole[]) => <>{renderStringTags(roles)}</>,
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

  // модальные окна
  const [UserModVisible, setUserModVisible] = useState(false);
  const [SchoolModVisible, setSchoolModVisible] = useState(false);
  const [AreaModVisible, setAreaModVisible] = useState(false);

  const showModalUser = () => {
    setUserModVisible(true);
  };
  const showModalSchool = () => {
    setSchoolModVisible(true);
  };

  const showModalArea = () => {
    setAreaModVisible(true);
  };

  // добавление пользователя
  const onCreateUser = (values: any) => {
    console.log("Созданный пользователь: ", values);
    setUserModVisible(false);
  };

  // добавление учреждения
  const onCreateSchool = (values: any) => {
    console.log("Учреждение: ", values);
    setSchoolModVisible(false);
  };

  // добавление учреждения
  const onCreateArea = (values: any) => {
    console.log("Район: ", values);
    setAreaModVisible(false);
  };

  // формы
  const [formUser] = Form.useForm();
  const [formPlace] = Form.useForm();
  const [formArea] = Form.useForm();

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
              dataSource={usersData}
              rowKey={(record) => record.id}
            />
          </Form>
        </Card>

        <PageHeader
          ghost={false}
          title="Список учреждений"
          subTitle="Учреждения дополнительного образования Белгородской области"
          extra={[
            <Button type="primary" onClick={showModalSchool}>
              Добавить учреждение
            </Button>,
          ]}
        />

        <Card>
          <Table
            className="table-striped-rows"
            columns={colsSchool}
            size="middle"
            dataSource={schoolsData}
            rowKey={(record) => record.id}
          />
        </Card>

        <PageHeader
          ghost={false}
          title="Список районов"
          subTitle="Районы Белгородской области, в которых проводится мониториг"
          extra={[
            <Button type="primary" onClick={showModalArea}>
              Добавить район
            </Button>,
          ]}
        />

        <Card>
          <Table
            className="table-striped-rows"
            columns={colsArea}
            size="middle"
            dataSource={areasData}
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
          isVisible={SchoolModVisible}
          form={formPlace}
          setVisible={setSchoolModVisible}
          onCreate={onCreateSchool}
        >
          <PlaceForm form={formPlace} label="Название учреждения" />
        </ModalWithForm>
        <ModalWithForm
          title="Новый район"
          isVisible={AreaModVisible}
          form={formArea}
          setVisible={setAreaModVisible}
          onCreate={onCreateArea}
        >
          <PlaceForm form={formArea} label="Название района" />
        </ModalWithForm>
      </Content>
    </Layout>
  );
};

export default SettingsPage;
