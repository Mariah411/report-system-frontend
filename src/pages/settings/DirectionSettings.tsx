import { Button, Card, Form, Layout, PageHeader, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { FC, useEffect, useState } from "react";
import DirectionService from "../../api/DirectionsServise";
import PlaceDirectionForm from "../../components/forms/createForms/PlaceDirectionForm";
import ModalWithForm from "../../components/ModalWithForm";
import { directionCols } from "../../data/directionTableData";
import { IDirection } from "../../models/IDirection";

const DirectionSettings: FC = () => {
  const [directionsData, setDirectionsData] = useState<IDirection[]>([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  useEffect(() => {
    setIsLoadingTable(true);
    const getDirectionsData = async () => {
      const responce = await DirectionService.getDirectionsAdmin();
      setDirectionsData(responce.data);
      setIsLoadingTable(false);
    };
    getDirectionsData();
  }, []);

  //модальное окно
  const [DirModVisible, setDirModVisible] = useState(false);

  const showModalDirection = () => {
    setDirModVisible(true);
  };

  // добавление направления
  const onCreateDirection = (values: any) => {
    console.log("Направление: ", values);
    setDirModVisible(false);
  };

  const [formDirection] = Form.useForm();

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
