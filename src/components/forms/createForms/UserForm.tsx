import { Checkbox, Form, FormInstance, Input } from "antd";

import { rules } from "../../../utils/rules";
import SelectSearchMultiply from "../../UI/SelectSearchMultiply";
type Props = {
  form: FormInstance<any>;
  places: { id: number; name: string }[];
};

const UserForm = (props: Props) => {
  const { form, places } = props;

  const defaultCheckRole = ["2"];
  const initialValues = {
    roles: defaultCheckRole,
  };

  const options = [
    { label: "Пользователь", value: "2" },
    { label: "Администратор", value: "1" },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={initialValues}
    >
      <Form.Item name="FIO" label="ФИО" rules={[rules.required()]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="mail"
        label="Электронная почта"
        rules={[rules.required(), { type: "email" }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        name="roles"
        label="Роли пользователя"
        rules={[rules.required()]}
      >
        <Checkbox.Group options={options} />
      </Form.Item>

      <Form.Item name="places" label="Зависимые районы / учреждения">
        <SelectSearchMultiply
          fieldName="places"
          data={places}
          form={form}
          selectedValues={[]}
          placeholder="Выберите район / учреждение"
        />
      </Form.Item>
    </Form>
  );
};

export default UserForm;
