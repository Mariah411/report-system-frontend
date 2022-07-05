import {
  Button,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Typography,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { IAnswerItem } from "../../../models/IAnswer";
import { rules } from "../../../utils/rules";
type Props = {
  answerItem: IAnswerItem;
  //form: FormInstance<any>;
};

const onSend = (values: any) => {
  console.log("Данные по учреждению", values);
};

const SchoolReportForm = (props: Props) => {
  // const { form } = props;

  const { answerItem } = props;

  const [form] = useForm();

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

  return (
    <Form form={form}>
      <Typography.Text strong>
        Количество обучающихся по техническим направленностям
      </Typography.Text>
      <Input.Group compact>
        <Form.Item name="t7_1_c1" label="по ДО(О)П" rules={[rules.required()]}>
          <InputNumber className="inputs-in-group" min={0} />
        </Form.Item>
        <Form.Item name="t7_1_c2" label="по АДО(О)П" rules={[rules.required()]}>
          <InputNumber className="inputs-in-group" min={0} />
        </Form.Item>
        <Form.Item name="t7_1_c3" label="Всего" rules={[rules.required()]}>
          <InputNumber className="inputs-in-group" min={0} />
        </Form.Item>
      </Input.Group>
      <Button type="primary" onClick={save}>
        Добавить в отчет
      </Button>
    </Form>
  );
};

export default SchoolReportForm;
