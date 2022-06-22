import { Button, Form, FormInstance, InputNumber, Table, Tooltip } from "antd";
import React, { useState } from "react";
import { columns, IProgramDataType } from "../../data/tableData";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { IProgram } from "../../models/IProgram";
type Props = {
  form: FormInstance<any>;
  programs: IProgramDataType[];
};

const onSend = (values: any) => {
  console.log("Данные по программам", values);
};

const ProgramsReportForm = (props: Props) => {
  const [disabledRows, setDisabledRows] = useState<number[]>([]);
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

  const DisableRow = (id: number) => {
    const newArr: number[] = [...disabledRows, id];
    setDisabledRows(newArr);
    form.setFieldsValue({ [id]: 0 });
  };

  const AbleRow = (id: number) => {
    const newArr: number[] = disabledRows.filter((item) => item !== id);
    setDisabledRows(newArr);
  };

  const isDisabled = (id: number) => {
    if (disabledRows.find((item) => item === id)) return true;
    return false;
  };
  const myColumns = [
    {
      title: "",
      dataIndex: "operation",
      render: (_: any, record: { id: number }) =>
        isDisabled(record.id) ? (
          <Tooltip title="Добавить в отчет">
            <Button
              shape="circle"
              icon={<PlusCircleOutlined />}
              onClick={() => AbleRow(record.id)}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Не включать в отчет">
            <Button
              shape="circle"
              icon={<MinusCircleOutlined />}
              onClick={() => DisableRow(record.id)}
            />
          </Tooltip>
        ),
    },
    ...columns,
    {
      title: "Количество детей",
      dataIndex: "num",
      render: (_: any, record: { id: number }) => (
        <Form.Item name={record.id}>
          <InputNumber
            defaultValue={0}
            min={0}
            disabled={isDisabled(record.id)}
          />
          {/* {isDisabled(record.id) ? (
            <InputNumber value={0} defaultValue={0} min={0} disabled />
          ) : (
            <InputNumber defaultValue={0} min={0} />
          )} */}
        </Form.Item>
      ),
    },
  ];

  return (
    <Form form={form} component={false}>
      <Table
        rowClassName={(record) =>
          isDisabled(record.id) ? "table-row-disabled" : "table-row-light"
        }
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
