import { FormInstance, Modal } from "antd";
import form from "antd/lib/form";
import React, { Children, ReactElement } from "react";

type Props = {
  children: ReactElement;
  title: string;
  form: FormInstance;
  isModalVisible: boolean;
  //setIsModalVisible: (arg:boolean):void
};
/*const ModalWithForm = (props: Props) => {

    const onCreate = (values: any) => {
        console.log("Received values of form: ", values);
        setIsModalVisible(false);
      };
    
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
        setIsModalVisible(false);
      };

  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Добавить"
      cancelText="Отмена"
    >
      {children}
    </Modal>
  );
};

export default ModalWithForm;
*/
