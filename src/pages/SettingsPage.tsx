import {
  Button,
  Card,
  Form,
  FormInstance,
  Layout,
  PageHeader,
  Row,
  Table,
  Tag,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { ColumnsType } from "antd/lib/table";
import { FC, useEffect, useState } from "react";
import PlacesService from "../api/PlacesService";
import UserService from "../api/UserServise";
import PlaceForm from "../components/forms/PlaceForm";
import UserForm from "../components/forms/UserForm";
import ModalWithForm from "../components/ModalWithForm";
import SelectSearchMultiply from "../components/SelectSearchMultiply";
import EllipsisText from "../components/UI/EllipsisText";
import { colsArea, colsSchool } from "../data/placesTableData";
import { IPlace, PlaceAdmin } from "../models/IPlace";
import { IRole } from "../models/IRole";
import { IUser } from "../models/IUser";

const SettingsPage: FC = () => {
  // данные о местах и пользователях
  const [usersData, setUsersData] = useState<IUser[]>([]);
  const [placesData, setPlacesData] = useState<PlaceAdmin[]>([]);
  const [schoolsData, setSchoolsData] = useState<PlaceAdmin[]>([]);
  const [areasData, setAreasData] = useState<PlaceAdmin[]>([]);
  // const [isLoadingTables, setIsLoadingTables] = useState({
  //   users: true,
  //   schools: true,
  //   areas: true,
  // });

  // загрузка данных
  useEffect(() => {
    const getUsersData = async () => {
      // setIsLoadingTables({ ...isLoadingTables, users: true });
      // const response = await UserService.getAllUsers();
      // setUsersData(response.data);
      // setIsLoadingTables({ ...isLoadingTables, users: false });

      const response = await UserService.getAllUsers();
      setUsersData(response.data);
    };

    const getPlacesData = async () => {
      const response = await PlacesService.getPlaces();
      setPlacesData(response.data);
    };

    const getSchoolsData = async () => {
      // setIsLoadingTables({ ...isLoadingTables, schools: true });
      // const response = await PlacesService.getSchools();
      // setSchoolsData(response);
      // setIsLoadingTables({ ...isLoadingTables, schools: false });

      const response = await PlacesService.getSchools();
      setSchoolsData(response);
    };

    const getAreaData = async () => {
      // setIsLoadingTables({ ...isLoadingTables, areas: true });
      // const response = await PlacesService.getAreas();
      // setAreasData(response);
      // setIsLoadingTables({ ...isLoadingTables, areas: false });

      const response = await PlacesService.getAreas();
      setAreasData(response);
    };

    getPlacesData();
    getSchoolsData();
    getUsersData();
    getAreaData();
  }, []);

  // форма для редактирования
  const [editingRow, setEditingRow] = useState<number>(0);
  const [editForm] = Form.useForm();

  const onEditUser = (form: FormInstance<any>, user_id: number) => {
    form.setFieldsValue({ account_id: user_id });
    form
      .validateFields()
      .then((values: any) => {
        form.resetFields();
        setEditingRow(0);
        console.log("Данные для редактирования пользователя", values);
      })
      .catch((info: any) => {
        console.log("Ошибка:", info);
      });
  };

  // отрисовка тегов
  const renderStringTags = (
    array: { id: number; name: string }[],
    color: string
  ) => {
    {
      return array.map((item) => (
        <Tag color={color} key={item.id}>
          <EllipsisText style={{ maxWidth: 300, color: color }}>
            {item.name}
          </EllipsisText>
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
      width: "15%",
    },

    {
      title: "Email",
      dataIndex: "mail",
      key: "mail",
      width: "15%",
    },
    {
      title: "Пароль",
      dataIndex: "password",
      key: "password",
      width: "15%",
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      width: "15%",
      render: (roles: IRole[]) => <>{renderStringTags(roles, "purple")}</>,
    },
    {
      title: "Места",
      dataIndex: "places",
      key: "places",
      width: "20%",
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
          <>{renderStringTags(places, "geekblue")}</>
        );
      },
    },

    {
      title: "",
      dataIndex: "",
      width: "20%",
      render: (_: any, record) => {
        return record.id === editingRow ? (
          <Row justify="center">
            <Button
              type="primary"
              onClick={() => {
                onEditUser(editForm, record.id);
              }}
            >
              Сохранить
            </Button>
            <Button
              onClick={() => {
                setEditingRow(0);
              }}
            >
              Отмена
            </Button>
          </Row>
        ) : (
          <Button
            onClick={() => {
              setEditingRow(record.id);
            }}
          >
            Редактировать
          </Button>
        );
      },
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
            <Form.Item name="account_id" hidden></Form.Item>
            <Table
              // loading={isLoadingTables.users}
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
            // loading={isLoadingTables.schools}
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
            // loading={isLoadingTables.areas}
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
