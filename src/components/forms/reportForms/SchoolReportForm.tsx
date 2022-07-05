import {
  Button,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Typography,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelectror";
import { IAnswerItem, IPlaceAnswer } from "../../../models/IAnswer";
import { rules } from "../../../utils/rules";
type Props = {
  place_id: number;
  // answerItem: IAnswerItem;
  //form: FormInstance<any>;
};

const SchoolReportForm = (props: Props) => {
  const { place_id } = props;

  const AnswerState = useTypedSelector((state) => state.answer);
  const { setPlaceDataForPlace } = useActions();

  const [form] = useForm();

  const onSend = () => {
    const formData = form.getFieldsValue();
    const formKeys = Object.keys(formData);

    const newData: IPlaceAnswer[] = formKeys.map((key) => ({
      code_name: key,
      value: formData[key],
    }));
    console.log(newData);

    setPlaceDataForPlace(AnswerState, place_id, newData);
  };

  const save = () => {
    form
      .validateFields()
      .then((values: any) => {
        //form.resetFields();
        onSend();
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
