import { Button, Form, FormInstance, InputNumber, Table } from "antd";
import React from "react";
import { columns, IProgramDataType } from "../../data/tableData";
import { IProgram } from "../../models/IProgram";
type Props = {
  form: FormInstance<any>;
  programs: IProgramDataType[];
};

const onSend = (values: any) => {
  console.log("Данные по программам", values);
};

const ProgramsReportForm = (props: Props) => {
  const { form, programs } = props;

  const save = () => {
    form
      .validateFields()
      .then((values: any) => {
        //form.resetFields();
        onSend(values);
      })
      .catch((info: any) => {
        console.log("Ошибки валидации:", info);
      });
  };

  const myColumns = [
    ...columns,
    {
      title: "Количество детей",
      dataIndex: "num",
      render: (_: any, record: { id: number }) => (
        <Form.Item name={record.id}>
          <InputNumber />
        </Form.Item>
      ),
    },
  ];

  return (
    <Form form={form} component={false}>
      <Table
        columns={myColumns}
        size="middle"
        dataSource={programs}
        rowKey={(record) => record.id}
      />
      <Button type="primary" onClick={save}>
        Добавить в отчет
      </Button>
    </Form>
  );
};

export default ProgramsReportForm;
