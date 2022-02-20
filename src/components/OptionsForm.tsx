import { Form, Select, InputNumber, Input, Button, Divider } from 'antd';
import { ArrowDefinition, Type } from 'sr-puzzlegen';
import React, { useEffect, useState } from 'react';
import SchemeForm from './SchemeForm';
import SelectEditCustomItem from './select/SelectEditCustomItem';
import MaskForm from './MaskForm';
import { DEFAULT_SCHEMES, Scheme } from '../data/scheme';
import { DEFAULT_MASK, getMasks, Mask } from '../data/mask';
import StickersForm from './StickersForm';
import ArrowsForm from './ArrowsForm';
import { StickerColors } from '../data/color';
import { PUZZLE_FACES } from '../data/face';
import { DEFAULT_ROTATIONS } from '../data/rotations';
import { DEFAULT_PUZZLE_SIZES } from '../data/size';

type Options = {
  width: number,
  height: number,
  puzzle: Type,
  size: number,
  alg: string,
  case: string,
  scheme: string,
  mask?: Mask,
  stickerColors?: StickerColors,
  arrows?: ArrowDefinition[],
  X: number,
  Y: number,
  Z: number
}

export type OptionsProps = {
  initialValues: any;
  initialType: Type;
  onApply: (options: any) => void;
}

export default function OptionsForm(props: OptionsProps) {
  const puzzleFaceColors = PUZZLE_FACES[props.initialType].reduce((prev, curr) => ({ ...prev, [curr]: [] }), {})
  const [showSchemeForm, setShowSchemeForm] = useState(false);
  const [showMaskForm, setShowMaskForm] = useState(false);
  const [showStickersForm, setShowStickersForm] = useState(false);
  const [showArrowsForm, setShowArrowsForm] = useState(false);
  const [scheme, setScheme] = useState<Scheme>(props.initialValues?.puzzle?.scheme);
  const [customMask, setCustomMask] = useState<Mask>(props.initialValues?.puzzle?.mask);
  const [stickerColors, setStickerColors] = useState<StickerColors>(puzzleFaceColors);
  const [arrows, setArrows] = useState<ArrowDefinition[]>(props.initialValues?.puzzle?.arrows);

  const [options, setOptions] = useState<Options>({
    width: props.initialValues.width || 250,
    height: props.initialValues.height || 250,
    size: props.initialValues.puzzle?.size || 3,
    puzzle: props.initialType || Type.CUBE,
    alg: props.initialValues.puzzle?.alg || '',
    case: props.initialValues.puzzle?.case || '',
    scheme: JSON.stringify(scheme, null, 2),
    arrows: arrows,
    X: props.initialValues.puzzle?.rotations[0]?.x || DEFAULT_ROTATIONS[Type.CUBE].x,
    Y: props.initialValues.puzzle?.rotations[0]?.y || DEFAULT_ROTATIONS[Type.CUBE].y,
    Z: props.initialValues.puzzle?.rotations[0]?.z || DEFAULT_ROTATIONS[Type.CUBE].z
  })

  const [form] = Form.useForm();
  const [masks, setMasks] = useState<{ [mask: string]: Mask }>(getMasks(options.puzzle));

  useEffect(() => {
    onClickApply();
  }, [stickerColors, scheme, customMask, arrows, options])

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

  const onSaveArrows = (arrows: ArrowDefinition[]) => {
    setArrows(arrows);
    setShowArrowsForm(false);
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
      mask: maskValue,
      arrows
    });
  }

  const onPuzzleChange = (value: Type) => {
    setScheme(DEFAULT_SCHEMES[value]);
    setCustomMask(DEFAULT_MASK[value]);

    form.setFieldsValue({
      X: DEFAULT_ROTATIONS[value].x,
      Y: DEFAULT_ROTATIONS[value].y,
      Z: DEFAULT_ROTATIONS[value].z,
      size: DEFAULT_PUZZLE_SIZES[value]
    });

    onFormChange({
      puzzle: value,
      size: DEFAULT_PUZZLE_SIZES[value],
      X: DEFAULT_ROTATIONS[value].x,
      Y: DEFAULT_ROTATIONS[value].y,
      Z: DEFAULT_ROTATIONS[value].z
    })
  }

  const shouldHideSize = options.puzzle == Type.SQUARE1
    || options.puzzle == Type.SQUARE1_NET
    || options.puzzle == Type.SKEWB
    || options.puzzle == Type.SKEWB_NET;

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        initialValues={{
          width: options.width,
          height: options.height,
          puzzle: options.puzzle,
          size: options.size,
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
        <Form.Item hidden={shouldHideSize} label="size" name="size">
          <InputNumber />
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
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button onClick={() => setShowSchemeForm(true)}>Set Scheme</Button>
          <Button onClick={() => setShowStickersForm(true)}>Set Stickers</Button>
          <Button onClick={() => setShowArrowsForm(true)}>Set Arrows</Button>
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
      {showArrowsForm ? <ArrowsForm
        faces={PUZZLE_FACES[options.puzzle]}
        arrows={arrows}
        visible={showArrowsForm}
        onOk={(arrows) => onSaveArrows(arrows)}
        onCancel={() => setShowArrowsForm(false)}
      /> : null}

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