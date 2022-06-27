import { Checkbox, Form, FormInstance, Input } from "antd";

import React from "react";
import { IPlace } from "../../models/IPlace";
import { rules } from "../../utils/rules";
import SelectSearchMultiply from "../SelectSearchMultiply";
type Props = {
  form: FormInstance<any>;
  places: { id: number; name: string }[];
};

const UserForm = (props: Props) => {
  const { form, places } = props;
  const options = [
    { label: "Пользователь", value: "user" },
    { label: "Администратор", value: "admin" },
  ];

  return (
    <Form form={form} layout="vertical" name="form_in_modal">
      <Form.Item name="fio" label="ФИО" rules={[rules.required()]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="email" rules={[rules.required()]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="roles"
        label="Роли пользователя"
        rules={[rules.required()]}
      >
        <Checkbox.Group options={options} defaultValue={["user"]} />
      </Form.Item>

      <Form.Item name="places" label="Зависимые районы / учреждения">
        <SelectSearchMultiply
          fieldName="places"
          data={places}
          form={form}
          selectedValues={[]}
        />
      </Form.Item>
    </Form>
  );
};

export default UserForm;
