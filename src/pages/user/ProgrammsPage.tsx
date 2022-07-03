import { Button, Card, Form, Layout, PageHeader, Popconfirm } from "antd";
import { Content } from "antd/lib/layout/layout";
import Table from "antd/lib/table";
import React, { FC, useEffect, useState } from "react";
import ProgramsService from "../../api/ProgramsServise";
import ProgramForm from "../../components/forms/createForms/ProgramForm";
import ModalWithForm from "../../components/ModalWithForm";
import { columns, IProgramDataType } from "../../data/tableData";

const ProgrammsPage: FC = () => {
  const [programmsData, setProgrammsData] = useState<IProgramDataType[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  // получение списка направлений и программ
  useEffect(() => {
    setIsLoading(true);

    const getProgrammsData = async () => {
      const response = await ProgramsService.getProgramms();
      const newData: IProgramDataType[] = response.data.map((val, index) => {
        return { key: index + 1, ...val };
      });
      setProgrammsData(newData);
      setIsLoading(false);
    };
    getProgrammsData();
  }, []);

  console.log(programmsData);

  // удаление программы (изменить)

  const handleDelete = (key: React.Key) => {
    const newData = programmsData.filter((item) => item.key !== key);
    setProgrammsData(newData);
  };

  const myColumns = [
    ...columns,
    {
      title: "",
      dataIndex: "operator",
      render: (_: any, record: { key: React.Key }) =>
        programmsData.length >= 1 ? (
          <Popconfirm
            title="Вы уверены?"
            onConfirm={() => {
              console.log(record);
              handleDelete(record.key);
            }}
          >
            <Button>Удалить</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // добавление программы (изменить)
  const onCreate = (values: any) => {
    console.log("Программа для добавления: ", values);
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  return (
    <Layout className="site-layout layout_m">
      <Content className="content content_m-20">
        <PageHeader
          ghost={false}
          title="Образовательные программы"
          extra={[
            <Button key="1" type="primary" onClick={showModal}>
              Добавить программу
            </Button>,
          ]}
        />
        <Card>
          <Table
            loading={isLoading}
            className="table-striped-rows"
            columns={myColumns}
            size="middle"
            dataSource={programmsData}
            rowKey={(record) => record.key}
          />
        </Card>

        <ModalWithForm
          title="Новая образовательная программа"
          isVisible={isModalVisible}
          form={form}
          setVisible={setIsModalVisible}
          onCreate={onCreate}
        >
          <ProgramForm form={form} />
        </ModalWithForm>
      </Content>
    </Layout>
  );
};

export default ProgrammsPage;
