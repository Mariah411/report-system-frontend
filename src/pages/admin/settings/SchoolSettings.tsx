import { Button, Card, Form, Layout, message, PageHeader, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import { FC, useEffect, useState } from "react";
import PlacesService from "../../../api/PlacesService";
import PlaceDirectionForm from "../../../components/forms/createForms/PlaceDirectionForm";
import ModalWithForm from "../../../components/ModalWithForm";
import { colsSchool } from "../../../data/placesTableData";
import { PlaceAdmin } from "../../../models/IPlace";

const SchoolSettings: FC = () => {
  const [schoolsData, setSchoolsData] = useState<PlaceAdmin[]>([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const getSchoolsData = async () => {
    const response = await PlacesService.getSchools();
    setSchoolsData(response);
    setIsLoadingTable(false);
  };

  const LoadingData = () => {
    setIsLoadingTable(true);
    getSchoolsData();
  };

  useEffect(() => LoadingData(), []);

  // модальное окно

  const [SchoolModVisible, setSchoolModVisible] = useState(false);
  const showModalSchool = () => {
    setSchoolModVisible(true);
  };

  // добавление учреждения
  const onCreateSchool = async (values: any) => {
    const { name } = values;

    const response = await PlacesService.addSchool(name)
      .then(() => {
        message.success("Успешно добавлено");
        setSchoolModVisible(false);
        LoadingData();
      })
      .catch((err) => {
        message.error("Произошла ошибка при добавлении учреждения");
        setSchoolModVisible(false);
      });
  };

  const [formSchool] = Form.useForm();

  return (
    <Layout className="site-layout">
      <Content className="content content_m-20">
        <PageHeader
          ghost={false}
          title="Список учреждений"
          subTitle="Учреждения дополнительного образования Белгородской области"
          extra={[
            <Button key="1" type="primary" onClick={showModalSchool}>
              Добавить учреждение
            </Button>,
          ]}
        />

        <Card>
          <Table
            loading={isLoadingTable}
            className="table-striped-rows"
            columns={colsSchool}
            size="middle"
            dataSource={schoolsData}
            rowKey={(record) => record.id}
          />
        </Card>

        <ModalWithForm
          title="Новое учреждение"
          isVisible={SchoolModVisible}
          form={formSchool}
          setVisible={setSchoolModVisible}
          onCreate={onCreateSchool}
        >
          <PlaceDirectionForm form={formSchool} label="Название учреждения" />
        </ModalWithForm>
      </Content>
    </Layout>
  );
};

export default SchoolSettings;
