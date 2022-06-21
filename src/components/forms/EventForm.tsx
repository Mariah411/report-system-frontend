import { DatePicker, Form, FormInstance, Input } from "antd";
import React, { FC } from "react";
import { rules } from "../../utils/rules";
type Props = {
  form: FormInstance<any>;
};

const EventForm: FC<Props> = (props: Props) => {
  return (
    <Form form={props.form} layout="vertical" name="form_in_modal">
      <Form.Item
        name="name"
        label="Название мероприятия"
        rules={[rules.required()]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="school" label="Учреждение" rules={[rules.required()]}>
        <Input />
      </Form.Item>
      <Form.Item name="date" label="Дата проведения" rules={[rules.required()]}>
        <DatePicker />
      </Form.Item>
    </Form>
  );
};

export default EventForm;
