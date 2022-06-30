import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
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
import RolesService from "../api/RolesServise";
import UserService from "../api/UserServise";
import PlaceForm from "../components/forms/PlaceForm";
import UserForm from "../components/forms/UserForm";
import ModalWithForm from "../components/ModalWithForm";
import SettingsRouter from "../components/routers/SettingsRouter";
import SelectSearchMultiply from "../components/SelectSearchMultiply";
import EllipsisText from "../components/UI/EllipsisText";
import { colsArea, colsSchool } from "../data/placesTableData";
import { IPlace, PlaceAdmin } from "../models/IPlace";
import { IRole } from "../models/IRole";
import { IUser } from "../models/IUser";

const SettingsPage: FC = () => {
  const onSearch = (value: string) => console.log(value);

  return (
    <Layout className="site-layout layout_m">
      <Content className="content content_m-20">
        <SettingsRouter />
      </Content>
    </Layout>
  );
};

export default SettingsPage;
