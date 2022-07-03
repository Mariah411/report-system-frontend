import { Button, Card, Form, Layout, message, PageHeader, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { FC, useEffect, useState } from "react";
import DirectionService from "../../../api/DirectionsServise";
import PlaceDirectionForm from "../../../components/forms/createForms/PlaceDirectionForm";
import ModalWithForm from "../../../components/ModalWithForm";
import { directionCols } from "../../../data/directionTableData";
import { IDirection } from "../../../models/IDirection";

const DirectionSettings: FC = () => {
  const [directionsData, setDirectionsData] = useState<IDirection[]>([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const getDirectionsData = async () => {
    const responce = await DirectionService.getDirectionsAdmin();
    setDirectionsData(responce.data);
    setIsLoadingTable(false);
  };

  const LoadingData = () => {
    setIsLoadingTable(true);
    getDirectionsData();
  };

  useEffect(() => LoadingData(), []);

  //модальное окно
  const [DirModVisible, setDirModVisible] = useState(false);

  const showModalDirection = () => {
    setDirModVisible(true);
  };

  const [formDirection] = Form.useForm();

  // добавление направления
  const onCreateDirection = async (values: { name: string }) => {
    const { name } = values;

    const response = await DirectionService.addDirection(name)
      .then(() => {
        message.success("Успешно добавлено");
        setDirModVisible(false);
        LoadingData();
      })
      .catch((err) => {
        message.error("Произошла ошибка при добавлении направления");
        setDirModVisible(false);
      });
  };

  return (
    <Layout className="site-layout">
      <Content className="content content_m-20">
        <PageHeader
          ghost={false}
          title="Направления обучения"
          extra={[
            <Button key="1" type="primary" onClick={showModalDirection}>
              Добавить направление
            </Button>,
          ]}
        />
        <Card>
          <Table
            loading={isLoadingTable}
            className="table-striped-rows"
            columns={directionCols}
            size="middle"
            dataSource={directionsData}
            rowKey={(record) => record.id}
          />
        </Card>

        <ModalWithForm
          title="Новое направление"
          isVisible={DirModVisible}
          form={formDirection}
          setVisible={setDirModVisible}
          onCreate={onCreateDirection}
        >
          <PlaceDirectionForm
            form={formDirection}
            label="Название направления"
          />
        </ModalWithForm>
      </Content>
    </Layout>
  );
};

export default DirectionSettings;
