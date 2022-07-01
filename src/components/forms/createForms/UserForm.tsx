import { Checkbox, Form, FormInstance, Input } from "antd";

import { rules } from "../../../utils/rules";
import SelectSearchMultiply from "../../UI/SelectSearchMultiply";
type Props = {
  form: FormInstance<any>;
  places: { id: number; name: string }[];
};

const UserForm = (props: Props) => {
  const { form, places } = props;

  const defaultCheckRole = ["user"];
  const initialValues = {
    roles: defaultCheckRole,
  };

  const options = [
    { label: "Пользователь", value: "user" },
    { label: "Администратор", value: "admin" },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={initialValues}
    >
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
