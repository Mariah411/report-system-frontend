import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
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
  console.log("Данные по району", values);
};

const AreaReportForm = (props: Props) => {
  //const { form } = props;

  const { answerItem } = props;

  const [form] = useForm();

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
      <Form.Item name="t2_c3" label="Всего детей" rules={[rules.required()]}>
        <InputNumber min={0} />
      </Form.Item>

      <Row>
        <Col className="form-col">
          <Typography.Text strong>
            Учреждения дошкольного образования{" "}
          </Typography.Text>
          <Input.Group compact>
            <Form.Item
              name="t2_c4"
              label="по ДО(О)П"
              rules={[rules.required()]}
            >
              <InputNumber className="inputs-in-group" min={0} />
            </Form.Item>
            <Form.Item
              name="t2_c5"
              label="по АДО(О)П"
              rules={[rules.required()]}
            >
              <InputNumber className="inputs-in-group" min={0} />
            </Form.Item>
          </Input.Group>
        </Col>
        <Col className="form-col">
          <Typography.Text strong>
            Общеобразовательные учреждения
          </Typography.Text>
          <Input.Group compact style={{}}>
            <Form.Item
              name="t2_c6"
              label="по ДО(О)П"
              rules={[rules.required()]}
            >
              <InputNumber className="inputs-in-group" min={0} />
            </Form.Item>
            <Form.Item
              name="t2_c7"
              label="по АДО(О)П"
              rules={[rules.required()]}
            >
              <InputNumber className="inputs-in-group" min={0} />
            </Form.Item>
          </Input.Group>
        </Col>
      </Row>

      <Row>
        <Col className="form-col">
          <Typography.Text strong>
            Учреждения дополнительного образования
          </Typography.Text>
          <Input.Group compact>
            <Form.Item
              name="t2_c8"
              label="по ДО(О)П"
              rules={[rules.required()]}
            >
              <InputNumber className="inputs-in-group" min={0} />
            </Form.Item>
            <Form.Item
              name="t2_c9"
              label="по АДО(О)П"
              rules={[rules.required()]}
            >
              <InputNumber className="inputs-in-group" min={0} />
            </Form.Item>
          </Input.Group>
        </Col>
        <Col className="form-col">
          <Typography.Text strong>Учреждения СПО</Typography.Text>
          <Input.Group compact>
            <Form.Item
              name="t2_c10"
              label="по ДО(О)П"
              rules={[rules.required()]}
            >
              <InputNumber className="inputs-in-group" min={0} />
            </Form.Item>
            <Form.Item
              name="t2_c11"
              label="по АДО(О)П"
              rules={[rules.required()]}
            >
              <InputNumber className="inputs-in-group" min={0} />
            </Form.Item>
          </Input.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Item
            name="t2_c12"
            label="Всего в территории"
            rules={[rules.required()]}
          >
            <InputNumber className="inputs-in-group" min={0} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="t2_c13"
            label="% охвата детей техническим творчеством"
            rules={[rules.required()]}
          >
            <InputNumber className="inputs-in-group" min={0} />
          </Form.Item>
        </Col>
      </Row>
      <Button type="primary" onClick={save}>
        Добавить в отчет
      </Button>
    </Form>
  );
};

export default AreaReportForm;
