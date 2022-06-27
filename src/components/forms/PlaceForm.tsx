import { Form, FormInstance, Input } from "antd";
import React from "react";
import { rules } from "../../utils/rules";

type Props = {
  form: FormInstance<any>;
  label: string;
};

const PlaceForm = (props: Props) => {
  const { form, label } = props;
  return (
    <Form form={form} layout="vertical" name="form_in_modal">
      <Form.Item name="name" label={label} rules={[rules.required()]}>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PlaceForm;
