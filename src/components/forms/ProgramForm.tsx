import React from "react";
import PropTypes from "prop-types";
import { Form, FormInstance, Input, Radio, Select } from "antd";
import { rules } from "../../utils/rules";
import { IDirection } from "../../models/IDirection";

type Props = {
  form: FormInstance<any>;
  directions: IDirection[];
};
const ProgramForm = (props: Props) => {
  return (
    <Form form={props.form} layout="vertical" name="form_in_modal">
      <Form.Item name="name" label="Название" rules={[rules.required()]}>
        <Input />
      </Form.Item>
      <Form.Item name="school" label="Учреждение" rules={[rules.required()]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="direction"
        label="Направление"
        rules={[rules.required()]}
      >
        <Select>
          {props.directions.map((direction) => (
            <Select.Option value={direction.id}>{direction.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="age" label="Возраст" rules={[rules.required()]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="programm_type"
        className="collection-create-form_last-form-item"
      >
        <Radio.Group>
          <Radio value="1">ДО(О)П</Radio>
          <Radio value="2">АДО(О)П</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default ProgramForm;
