import { Form, Modal, Tag, AutoComplete } from 'antd';
import { AllColors, StickerColors } from '../data/color';
import { useState } from 'react';

type StickersFormProps = {
  visible: boolean;
  onOk: (colors: StickerColors) => void;
  onCancel: () => void;
  stickerColors: StickerColors;
}

const colorOptions = Object.keys(AllColors);

const tagColorsOverride: { [color: string]: string } = {
  WHITE: "default",
  LIGHT_YELLOW: "default",
  YELLOW: "gold",
}

export default function StickersForm(props: StickersFormProps) {
  const [form] = Form.useForm();

  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [faces, setFaces] = useState(Object.keys(props.stickerColors));
  const [faceColors, setFaceColors] = useState(props.stickerColors);

  const onSearch = (searchText: string) => {
    const search = searchText.toLowerCase();
    const filteredColors = colorOptions
      .filter(colorName => colorName.toLowerCase().includes(search))
      .map(colorName => ({ value: colorName }));

    setOptions(filteredColors);
  }

  const onSelect = (value: any, option: any, face: string) => {
    const newFaceColors = {
      ...faceColors,
      [face]: [...faceColors[face], AllColors[value]]
    }
    setFaceColors(newFaceColors);
  };

  const removeColor = (e: any, face: string, index: number) => {
    e.preventDefault();

    const newFaceColors = {
      ...faceColors,
      [face]: faceColors[face].filter((v, i) => i !== index)
    }

    setFaceColors(newFaceColors);
  }

  const onOk = () => {
    props.onOk(faceColors);
  }

  return (
    <Modal
      title="Stickers Editor"
      visible={props.visible}
      onOk={onOk}
      onCancel={() => props.onCancel()}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
      >
        {faces.map(face => (
          <Form.Item label={face} key={face}>
            {faceColors[face].map((color, index) => (
              <Tag
                closable
                onClose={(e) => removeColor(e, face, index)}
                color={tagColorsOverride[color.name] || color.value}
                key={index}
              >
                {color.name}
              </Tag>
            ))}
            <AutoComplete
              options={options}
              onSelect={(v: any, o: any) => onSelect(v, o, face)}
              onFocus={() => onSearch("")}
              onSearch={onSearch} />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  )
}