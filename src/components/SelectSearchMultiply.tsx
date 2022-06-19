import { FormInstance, Select, Tag } from "antd";
import React, { FC } from "react";
import { IPlace } from "../models/IPlace";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

const onSearch = (value: string) => {
  console.log("search:", value);
};

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color="purple"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

type Props = {
  data: IPlace[];
  form: FormInstance<any>;
};
const SelectSearchMultiply = (props: Props) => {
  const onChange = (values: number[]) => {
    props.form.setFieldsValue({ places: values });
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
