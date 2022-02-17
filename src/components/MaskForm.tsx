import { Modal, Form, Input, Typography } from 'antd';
import { Mask } from '../data/mask';
import { useState } from 'react';


type MaskFormProps = {
  visible: boolean;
  onOk: (mask: { [face: string]: number[] }) => void;
  onCancel: () => void;
  mask: { [face: string]: number[] }
}

const numberListRule = {
  message: "Must be a list of number separated by comma (ex '0,1,2,3')",
  validator: (_: any, value: string) => {
    if (value && typeof value === "string") {
      try {
        const numbers = value.split(",")
        for (let i = 0; i < numbers.length; i++) {
          const parsed = parseInt(numbers[i]);
          if (Number.isNaN(parsed) || !Number.isInteger(parsed) || !Number.isFinite(parsed)) {
            return Promise.reject();
          }
        }

        return Promise.resolve();
      } catch {
        return Promise.reject();
      }
    }

    return Promise.resolve();
  }
}

const stringifyMaskValues = (mask: Mask) => Object.keys(mask)
  .reduce((prev, current) => ({
    ...prev,
    [current]: mask[current].join(",")
  }), {});


export default function MaskForm(props: MaskFormProps) {
  const [form] = Form.useForm();

  const onOk = () => {
    const values = form.getFieldsValue();
    const parsed = Object.keys(values).reduce((prev, current) => ({
      ...prev,
      [current]: values[current]
        ? values[current].split(",").map((v: string) => parseInt(v))
        : []
    }), {});
    props.onOk(parsed);
  }

  const [okDisabled, setOkDisabled] = useState(false);

  const isFormValid = () => form.getFieldsError().some(item => item.errors.length > 0);

  return (
    <Modal
      title="Mask Editor"
      visible={props.visible}
      onOk={onOk}
      onCancel={() => props.onCancel()}
      okButtonProps={{ disabled: okDisabled }}>
      <Typography.Text>Enter the indicies of the stickers to mask out on each face</Typography.Text>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        initialValues={stringifyMaskValues(props.mask)}
        onBlur={() => setTimeout(() => setOkDisabled(isFormValid()))}
        validateTrigger="onBlur">

        {Object.keys(props.mask).map((face, index) => (
          <Form.Item
            label={face}
            name={face}
            key={face}
            rules={[numberListRule]}>
            <Input placeholder={index === 0 ? "0,1,2" : ""} />
          </Form.Item>
        ))}

      </Form>
    </Modal>
  )
}