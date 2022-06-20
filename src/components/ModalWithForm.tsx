import { FormInstance, Modal } from "antd";
import form from "antd/lib/form";
import React, { Children, ReactElement } from "react";

type Props = {
  children: ReactElement;
  title: string;
  form: FormInstance;
  isVisible: boolean;
  setVisible: (args: boolean) => void;
  onCreate: (args: any) => void;
};
const ModalWithForm = (props: Props) => {
  const { setVisible, title, form, isVisible, onCreate } = props;

  const handleOk = () => {
    form
      .validateFields()
      .then((values: any) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info: any) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title={title}
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Добавить"
      cancelText="Отмена"
    >
      {props.children}
    </Modal>
  );
};

export default ModalWithForm;
