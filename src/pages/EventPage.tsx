import {
  Button,
  Card,
  Col,
  Form,
  Layout,
  PageHeader,
  Row,
  Table,
  Typography,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { FC, useEffect, useState } from "react";
import EventForm from "../components/forms/createForms/EventForm";
import ModalWithForm from "../components/ModalWithForm";
import { columns, data } from "../data/tableEventsData";

const EventPage: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    // получение мероприятий добавить
    setIsLoading(false);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onCreate = (values: any) => {
    console.log("Данные из формы: ", values);
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  return (
    <Layout className="site-layout layout_m">
      <Content className="content content_m-20">
        <PageHeader
          ghost={false}
          title="Мероприятия"
          extra={[
            <Button key="1" type="primary" onClick={showModal}>
              Добавить мероприятие
            </Button>,
          ]}
        />
        <Card>
          <Table
            loading={isLoading}
            className="table-striped-rows"
            columns={columns}
            size="middle"
            dataSource={data}
          />
        </Card>

        <ModalWithForm
          title="Новое мероприятие"
          isVisible={isModalVisible}
          form={form}
          setVisible={setIsModalVisible}
          onCreate={onCreate}
        >
          <EventForm form={form} />
        </ModalWithForm>
      </Content>
    </Layout>
  );
};

export default EventPage;
