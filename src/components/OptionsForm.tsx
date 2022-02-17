import { Form, Select, InputNumber, Input, Button, Divider } from 'antd';
import { Type } from 'sr-puzzlegen';
import React, { useEffect, useState } from 'react';
import SchemeForm from './SchemeForm';
import SelectEditCustomItem from './select/SelectEditCustomItem';
import MaskForm from './MaskForm';
import { DEFAULT_SCHEMES, Scheme } from '../data/scheme';
import { DEFAULT_MASK, getMasks, Mask } from '../data/mask';
import StickersForm from './StickersForm';
import { StickerColors } from '../data/color';
import { PUZZLE_FACES } from '../data/face';
import { DEFAULT_ROTATIONS } from '../data/rotations';

type Options = {
  width: number,
  height: number,
  puzzle: Type,
  alg: string,
  case: string,
  scheme: string,
  mask?: Mask,
  stickerColors?: StickerColors,
  X: number,
  Y: number,
  Z: number
}

export type OptionsProps = {
  onApply: (options: any) => void
}

export default function OptionsForm(props: OptionsProps) {

  const puzzleFaceColors = PUZZLE_FACES[Type.CUBE].reduce((prev, curr) => ({ ...prev, [curr]: [] }), {})

  const [showSchemeForm, setShowSchemeForm] = useState(false);
  const [showMaskForm, setShowMaskForm] = useState(false);
  const [showStickersForm, setShowStickersForm] = useState(false);
  const [scheme, setScheme] = useState<Scheme>(DEFAULT_SCHEMES[Type.CUBE]);
  const [customMask, setCustomMask] = useState<Mask>(DEFAULT_MASK[Type.CUBE]);
  const [stickerColors, setStickerColors] = useState<StickerColors>(puzzleFaceColors);

  const [options, setOptions] = useState<Options>({
    width: 250,
    height: 250,
    puzzle: Type.CUBE,
    alg: '',
    case: '',
    scheme: JSON.stringify(scheme, null, 2),
    X: DEFAULT_ROTATIONS[Type.CUBE].x,
    Y: DEFAULT_ROTATIONS[Type.CUBE].y,
    Z: DEFAULT_ROTATIONS[Type.CUBE].z
  })

  const [form] = Form.useForm();
  const [masks, setMasks] = useState<{ [mask: string]: Mask }>(getMasks(options.puzzle));

  useEffect(() => {
    onClickApply();
  }, [stickerColors, scheme, options])

  const onFormChange = (changes: any) => {
    let newOptions = {
      ...options,
      ...changes
    };
    const newMasks = getMasks(newOptions.puzzle);
    setMasks(newMasks);
    if (!newMasks[newOptions.mask]) {
      newOptions.mask = null;
      form.setFieldsValue({ mask: null });
    }
    setOptions(newOptions);
  }

  const onSaveScheme = (scheme: Scheme) => {
    form.setFieldsValue({ scheme: JSON.stringify(scheme, null, 2) });
    setScheme(scheme)
    setShowSchemeForm(false);
  }

  const onSaveMask = (mask: any) => {
    const newMasks = getMasks(options.puzzle);
    newMasks["CUSTOM"] = mask;
    setMasks(newMasks);
    setCustomMask(mask);
    form.setFieldsValue({ mask: "CUSTOM" });
    setShowMaskForm(false);
  }

  const onSaveColors = (colors: StickerColors) => {
    setStickerColors(colors);
    setShowStickersForm(false);
  }

  const onClickApply = () => {
    const trimmedColors: any = {}
    Object.keys(stickerColors).forEach(face => {
      if (stickerColors[face].length > 0) {
        trimmedColors[face] = stickerColors[face];
      }
    })

    const selectedMaskName = form.getFieldValue("mask");
    const maskValue = selectedMaskName === "CUSTOM"
      ? customMask
      : masks[selectedMaskName];

    props.onApply({
      ...options,
      scheme,
      stickerColors: Object.keys(trimmedColors).length > 0 ? trimmedColors : null,
      mask: maskValue
    });
  }

  const onPuzzleChange = (value: Type) => {
    setScheme(DEFAULT_SCHEMES[value]);
    setCustomMask(DEFAULT_MASK[value]);

    form.setFieldsValue({
      X: DEFAULT_ROTATIONS[value].x,
      Y: DEFAULT_ROTATIONS[value].y,
      Z: DEFAULT_ROTATIONS[value].z
    });

    onFormChange({
      puzzle: value,
      X: DEFAULT_ROTATIONS[value].x,
      Y: DEFAULT_ROTATIONS[value].y,
      Z: DEFAULT_ROTATIONS[value].z
    })
  }

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 17 }}
        initialValues={{
          width: options.width,
          height: options.height,
          puzzle: options.puzzle,
          alg: options.alg,
          case: options.case,
          scheme: options.scheme,
          mask: options.mask,
          X: options.X,
          Y: options.Y,
          Z: options.Z
        }}
        onValuesChange={onFormChange}
      >
        <Form.Item label="width" name="width">
          <InputNumber />
        </Form.Item>
        <Form.Item label="height" name="height">
          <InputNumber />
        </Form.Item>
        <Form.Item label="puzzle" name="puzzle">
          <Select onChange={onPuzzleChange}>
            {Object.keys(Type).map(type => (
              <Select.Option value={(Type as any)[type]} key={type}>{type}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="alg" name="alg">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="case" name="case">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="scheme" name="scheme" hidden={true}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="mask" name="mask">
          <Select
            allowClear={true}
            dropdownRender={menu => dropDownRenderer(menu, () => setShowMaskForm(true))}
          >
            {Object.keys(masks).map(mask => (
              <Select.Option value={mask} key={mask}>{mask}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="X" name="X">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Y" name="Y">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Z" name="Z">
          <InputNumber />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button onClick={() => setShowSchemeForm(true)}>Set Scheme</Button>
          <Button onClick={() => setShowStickersForm(true)}>Set Stickers</Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" onClick={onClickApply}>Apply</Button>
        </Form.Item>
      </Form>
      {showSchemeForm ? <SchemeForm
        scheme={scheme}
        visible={showSchemeForm}
        onOk={(scheme) => onSaveScheme(scheme)}
        onCancel={() => setShowSchemeForm(false)} />
        : null}
      {showMaskForm ? <MaskForm
        visible={showMaskForm}
        onOk={(customMask) => onSaveMask(customMask)}
        onCancel={() => setShowMaskForm(false)}
        mask={customMask} /> : null}
      {showStickersForm ? <StickersForm
        visible={showStickersForm}
        onOk={(colors) => onSaveColors(colors)}
        onCancel={() => setShowStickersForm(false)}
        stickerColors={stickerColors} /> : null}

    </>
  )
}

const dropDownRenderer = (menu: React.ReactElement, onEditCustom: () => void): React.ReactElement => {
  return (
    <div>
      {menu}
      <Divider style={{ margin: '4px 0' }} />
      <SelectEditCustomItem onEditCustom={onEditCustom} />
    </div>
  )
}