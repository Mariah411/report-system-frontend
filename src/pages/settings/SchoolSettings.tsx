import { Button, Card, Form, Layout, PageHeader, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { FC, useEffect, useState } from "react";
import PlacesService from "../../api/PlacesService";
import PlaceForm from "../../components/forms/PlaceForm";
import ModalWithForm from "../../components/ModalWithForm";
import { colsSchool } from "../../data/placesTableData";
import { PlaceAdmin } from "../../models/IPlace";

const SchoolSettings: FC = () => {
  const [schoolsData, setSchoolsData] = useState<PlaceAdmin[]>([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  useEffect(() => {
    setIsLoadingTable(true);
    const getSchoolsData = async () => {
      const response = await PlacesService.getSchools();
      setSchoolsData(response);
      setIsLoadingTable(false);
    };

    getSchoolsData();
  }, []);

  // модальное окно

  const [SchoolModVisible, setSchoolModVisible] = useState(false);
  const showModalSchool = () => {
    setSchoolModVisible(true);
  };

  // добавление учреждения
  const onCreateSchool = (values: any) => {
    console.log("Учреждение: ", values);
    setSchoolModVisible(false);
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
          <PlaceForm form={formSchool} label="Название учреждения" />
        </ModalWithForm>
      </Content>
    </Layout>
  );
};

export default SchoolSettings;
