import {
  Button,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Typography,
} from "antd";
import React from "react";
import { rules } from "../../utils/rules";
type Props = {
  form: FormInstance<any>;
};

const onSend = (values: any) => {
  console.log("Данные по учреждению", values);
};

const SchoolReportForm = (props: Props) => {
  const { form } = props;

  const save = () => {
    form
      .validateFields()
      .then((values: any) => {
        form.resetFields();
        onSend(values);
      })
      .catch((info: any) => {
        console.log("Ошибки валидации:", info);
      });
  };

  return (
    <Form form={form}>
      <Typography.Text strong>
        Количество обучающихся по техническим направленностям
      </Typography.Text>
      <Input.Group compact>
        <Form.Item
          name="school_DOOP"
          label="по ДО(О)П"
          rules={[rules.required()]}
        >
          <InputNumber className="inputs-in-group" defaultValue={0} min={0} />
        </Form.Item>
        <Form.Item
          name="school_ADOOP"
          label="по АДО(О)П"
          rules={[rules.required()]}
        >
          <InputNumber className="inputs-in-group" defaultValue={0} min={0} />
        </Form.Item>
      </Input.Group>
      <Button type="primary" onClick={save}>
        Добавить в отчет
      </Button>
    </Form>
  );
};

export default SchoolReportForm;
