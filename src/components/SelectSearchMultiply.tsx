import { FormInstance, Select, Tag, Typography } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import EllipsisText from "./UI/EllipsisText";

const onSearch = (value: string) => {
  console.log("search:", value);
};

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  return (
    <Tag
      color="magenta"
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      <EllipsisText style={{ maxWidth: 300 }}>{label}</EllipsisText>

      {/* <Typography.Text style={{ width: 100 }} ellipsis>
        {label}
      </Typography.Text> */}
    </Tag>
  );
};

type Props = {
  data: { id: number | string; name: string }[];
  form: FormInstance<any>;
  selectedValues: number[];
  fieldName: string;
};
const SelectSearchMultiply = (props: Props) => {
  const onChange = (values: number[]) => {
    props.form.setFieldsValue({ [props.fieldName]: values });
    console.log(values);
  };
  return (
    <Select
      mode="multiple"
      showSearch
      placeholder="Выберите район/учреждение"
      optionFilterProp="children"
      tagRender={tagRender}
      onChange={onChange}
      onSearch={onSearch}
      defaultValue={props.selectedValues}
      filterOption={(input, option) =>
        (option!.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    >
      {props.data.map((item) => (
        <Select.Option value={item.id}>{item.name}</Select.Option>
      ))}
    </Select>
  );
};

export default SelectSearchMultiply;
