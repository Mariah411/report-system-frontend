import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  Layout,
  PageHeader,
  Row,
  Tag,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import Table, { ColumnsType } from "antd/lib/table";
import { FC, useEffect, useState } from "react";
import PlacesService from "../../api/PlacesService";
import RolesService from "../../api/RolesServise";
import UserService from "../../api/UserServise";
import UserForm from "../../components/forms/createForms/UserForm";
import ModalWithForm from "../../components/ModalWithForm";
import EllipsisText from "../../components/UI/EllipsisText";
import SelectSearchMultiply from "../../components/UI/SelectSearchMultiply";
import { IPlace, PlaceAdmin } from "../../models/IPlace";
import { IRole } from "../../models/IRole";
import { IUser } from "../../models/IUser";

const UserSettings: FC = () => {
  const [usersData, setUsersData] = useState<IUser[]>([]);
  const [placesData, setPlacesData] = useState<PlaceAdmin[]>([]);
  const [rolesData, setRolesData] = useState<IRole[]>([]);

  const [isLoadingTable, setIsLoadingTable] = useState(false);

  useEffect(() => {
    setIsLoadingTable(true);
    const getUsersData = async () => {
      const response = await UserService.getAllUsers();
      setUsersData(response.data);
      setIsLoadingTable(false);
    };

    const getPlacesData = async () => {
      const response = await PlacesService.getPlaces();
      setPlacesData(response.data);
    };

    const getRoles = async () => {
      const response = await RolesService.getRoles();
      setRolesData(response.data);
    };

    getUsersData();
    getPlacesData();
    getRoles();
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
        <Tag color={color} key={item.id} className="tag">
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
      render: (roles: IRole[], record) => {
        let recordRoles: number[] = [];
        record.roles.map((role) => recordRoles.push(role.id));
        return record.id === editingRow ? (
          <Form.Item name="roles">
            <SelectSearchMultiply
              fieldName="roles"
              data={rolesData}
              form={editForm}
              selectedValues={recordRoles}
              placeholder="Выберите роль"
            />
          </Form.Item>
        ) : (
          <>{renderStringTags(roles, "purple")}</>
        );
      },
      //  <>{renderStringTags(roles, "purple")}</>,
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
              placeholder="Выберите районы/учреждения"
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
              className="edit_button"
              type="primary"
              onClick={() => {
                onEditUser(editForm, record.id);
              }}
            >
              Сохранить
            </Button>
            <Button
              className="edit_button"
              onClick={() => {
                setEditingRow(0);
              }}
            >
              Отмена
            </Button>
          </Row>
        ) : (
          <Row justify="center">
            <Button
              onClick={() => {
                setEditingRow(record.id);
              }}
            >
              Редактировать
            </Button>
          </Row>
        );
      },
    },
  ];

  // модальное окно
  const [UserModVisible, setUserModVisible] = useState(false);

  const showModalUser = () => {
    setUserModVisible(true);
  };

  // добавление пользователя
  const onCreateUser = (values: any) => {
    console.log("Созданный пользователь: ", values);
    setUserModVisible(false);
  };
  // форма
  const [formUser] = Form.useForm();

  return (
    <Layout className="site-layout">
      <Content className="content content_m-20">
        <PageHeader
          ghost={false}
          title="Управление системой"
          subTitle="Пользователи системы"
          extra={[
            <Button key="1" type="primary" onClick={showModalUser}>
              Добавить нового пользователя
            </Button>,
          ]}
        />
        <Card>
          <Form form={editForm} component={false}>
            <Form.Item name="account_id" hidden>
              <Input type="hidden" />
            </Form.Item>
            <Table
              loading={isLoadingTable}
              className="table-striped-rows"
              columns={cols1}
              size="middle"
              dataSource={usersData}
              rowKey={(record) => record.id}
            />
          </Form>
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
      </Content>
    </Layout>
  );
};

export default UserSettings;
