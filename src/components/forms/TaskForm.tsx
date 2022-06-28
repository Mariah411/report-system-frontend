import {
  DatePicker,
  DatePickerProps,
  Form,
  FormInstance,
  Input,
  Radio,
} from "antd";
import React from "react";
import { formatYear } from "../../utils/date";
import { rules } from "../../utils/rules";

type Props = {
  form: FormInstance<any>;
};

const TaskForm = (props: Props) => {
  const { form } = props;

  const onChange: DatePickerProps["onChange"] = (date) => {
    if (date) {
      const year = Number(formatYear(date.toDate()));
      console.log(year);
      form.setFieldsValue({ year: year });
    }
  };

  return (
    <Form form={form} layout="vertical" name="form_in_modal">
      <Form.Item name="year" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item
        name="year_calendar"
        label="Год отчета"
        rules={[rules.required()]}
      >
        <DatePicker onChange={onChange} picker="year" />
      </Form.Item>

      <Form.Item
        label="Выберите полугодие"
        name="half_year"
        rules={[rules.required()]}
      >
        <Radio.Group>
          <Radio value="1">1 полугодие</Radio>
          <Radio value="2">2 полугодие</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
