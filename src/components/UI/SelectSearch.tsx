import { FormInstance, Select } from "antd";
import React from "react";

type Props = {
  data: { id: number; name: string }[];
  form: FormInstance<any>;
  fieldName: string;
};
const SelectSearch = (props: Props) => {
  const { data, form, fieldName } = props;

  const onChange = (values: number[]) => {
    form.setFieldsValue({ [fieldName]: values });
    //console.log(values);
  };

  return (
    <Select
      showSearch
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
        (option!.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    >
      {data.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectSearch;
