import { Form, Modal, Select, InputNumber, Button, Tag } from 'antd';
import { useState } from 'react';
import { ArrowDefinition } from 'sr-puzzlegen';

type ArrowsFormProps = {
  visible: boolean;
  arrows: ArrowDefinition[];
  faces: String[];
  onOk: (arrows: ArrowDefinition[]) => void;
  onCancel: () => void;
}

export default function ArrowsForm(props: ArrowsFormProps) {
  const [form] = Form.useForm();

  const [arrows, setArrows] = useState<ArrowDefinition[]>(JSON.parse(JSON.stringify(props.arrows)));

  const addArrow = () => {
    let { face1, sticker1, face2, sticker2 } = form.getFieldsValue();
    if (face1 && !isNaN(sticker1) && face2 && !isNaN(sticker2)) {
      setArrows([
        ...arrows,
        {
          start: {
            face: face1,
            sticker: sticker1
          },
          end: {
            face: face2,
            sticker: sticker2
          }
        } as ArrowDefinition
      ])
    }
  }

  const removeArrow = (e: any, index: number) => {
    e.preventDefault();
    const newArrows = arrows.filter((value, i) => i !== index)
    setArrows(newArrows);
  }

  const onOk = () => {
    props.onOk(arrows);
  }

  return (
    <Modal
      title="Arrows Editor"
      visible={props.visible}
      onOk={onOk}
      onCancel={props.onCancel}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item wrapperCol={{ offset: 4 }} hidden={!arrows || arrows.length == 0}>
          {arrows.map((arrow, index) => (
            <Tag
              closable
              onClose={(e) => removeArrow(e, index)}
              key={index}
            >
              {`${arrow.start.face}${arrow.start.sticker}:${arrow.end.face}${arrow.end.sticker}`}
            </Tag>
          ))}
        </Form.Item>
        <Form.Item label="start">
          <Form.Item name="face1">
            <Select placeholder="face">
              {props.faces.map((face, index) => (
                <Select.Option value={face} key={index}>{face}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="sticker1">
            <InputNumber placeholder="index" />
          </Form.Item>
        </Form.Item>

        <Form.Item label="end">
          <Form.Item name="face2">
            <Select placeholder="face">
              {props.faces.map((face, index) => (
                <Select.Option value={face} key={index}>{face}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="sticker2">
            <InputNumber placeholder="index" />
          </Form.Item>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button onClick={() => addArrow()}> Add Arrow</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}