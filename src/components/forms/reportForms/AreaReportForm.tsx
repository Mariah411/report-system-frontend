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
import { rules } from "../../../utils/rules";

type Props = {
  form: FormInstance<any>;
};

const onSend = (values: any) => {
  console.log("Данные по району", values);
};

const AreaReportForm = (props: Props) => {
  const { form } = props;

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
      <Form.Item name="all_kids" label="Всего детей" rules={[rules.required()]}>
        <InputNumber min={0} />
      </Form.Item>

      <Row>
        <Col className="form-col">
          <Typography.Text strong>
            Учреждения дошкольного образования{" "}
          </Typography.Text>
          <Input.Group compact>
            <Form.Item
              name="1_DOOP"
              label="по ДО(О)П"
              rules={[rules.required()]}
            >
              <InputNumber className="inputs-in-group" min={0} />
            </Form.Item>
            <Form.Item
              name="1_ADOOP"
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
              name="2_DOOP"
              label="по ДО(О)П"
              rules={[rules.required()]}
            >
              <InputNumber className="inputs-in-group" min={0} />
            </Form.Item>
            <Form.Item
              name="2_ADOOP"
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
              name="3_DOOP"
              label="по ДО(О)П"
              rules={[rules.required()]}
            >
              <InputNumber className="inputs-in-group" min={0} />
            </Form.Item>
            <Form.Item
              name="3_ADOOP"
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
              name="4_DOOP"
              label="по ДО(О)П"
              rules={[rules.required()]}
            >
              <InputNumber className="inputs-in-group" min={0} />
            </Form.Item>
            <Form.Item
              name="4_ADOOP"
              label="по АДО(О)П"
              rules={[rules.required()]}
            >
              <InputNumber className="inputs-in-group" min={0} />
            </Form.Item>
          </Input.Group>
        </Col>
      </Row>
      <Button type="primary" onClick={save}>
        Добавить в отчет
      </Button>
    </Form>
  );
};

export default AreaReportForm;
