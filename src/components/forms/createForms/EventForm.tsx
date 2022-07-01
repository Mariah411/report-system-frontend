import { DatePicker, Form, FormInstance, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { FC, useEffect, useState } from "react";
import PlacesService from "../../../api/PlacesService";
import { useTypedSelector } from "../../../hooks/useTypedSelectror";
import { IPlace } from "../../../models/IPlace";
import { rules } from "../../../utils/rules";
import SelectSearch from "../../SelectSearch";
type Props = {
  form: FormInstance<any>;
};

const EventForm: FC<Props> = (props: Props) => {
  const { form } = props;

  // получение мест пользователя

  const placesData: IPlace[] = useTypedSelector(
    (state) => state.auth.user.places
  );

  return (
    <Form form={form} layout="vertical" name="form_in_modal">
      <Form.Item
        name="name"
        label="Название мероприятия"
        rules={[rules.required()]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="id_place"
        label="Место проведения мероприятия (район или учреждение ДО)"
        rules={[rules.required()]}
      >
        <SelectSearch form={form} data={placesData} fieldName="id_place" />
      </Form.Item>

      <Form.Item name="date" label="Дата проведения" rules={[rules.required()]}>
        <DatePicker />
      </Form.Item>

      <Form.Item name="description" label="Описание мероприятия">
        <TextArea></TextArea>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
