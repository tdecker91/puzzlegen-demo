import { Modal, Form, Select } from 'antd';
import { AllColors } from '../data/color';
import { Scheme } from '../data/scheme';

type SchemeFormProps = {
  visible: boolean;
  onOk: (scheme: any) => void;
  onCancel: () => void;
  scheme: Scheme
}

const colorOptions = () => {
  return Object.keys(AllColors).map(color => (
    <Select.Option value={JSON.stringify(AllColors[color])} key={color}>{color}</Select.Option>
  ));
}

const parseFormValues = (values: { [face: string]: string }) => 
  Object.keys(values)
  .reduce((prev, current) => ({
    ...prev,
    [current]: JSON.parse(values[current])
  }), {});

const stringifySchemeValues = (scheme: Scheme) => Object.keys(scheme)
.reduce((prev, current) => ({
  ...prev, 
  [current]: JSON.stringify(scheme[current])
}), {});

export default function SchemeForm(props: SchemeFormProps) {
  const [form] = Form.useForm();

  const onOk = () => {
    const values = form.getFieldsValue();
    const parsed = parseFormValues(values);
    props.onOk(parsed);
  }
  
  return (
    <Modal 
      title="Scheme Editor" 
      visible={props.visible} 
      onOk={ onOk }
      onCancel={() => props.onCancel() }>
      <Form 
        initialValues={stringifySchemeValues(props.scheme)}
        form={form}
        labelCol={{ span: 4 }} 
        wrapperCol={{ span: 12 }}>
        {Object.keys(props.scheme).map(face => (
          <Form.Item label={face} name={face} key={face}>
            <Select>
              {colorOptions()}
            </Select>
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
}