import { AllColors } from './color';
import { IColor } from 'sr-puzzlegen/dist/lib/geometry/color';
import { Type } from "sr-puzzlegen";

export type Scheme = {
  [face: string]: IColor
}

const DEFAULT_CUBE_SCHEME: Scheme = {
  U: AllColors.Yellow,
  R: AllColors.Red,
  F: AllColors.Blue,
  D: AllColors.White,
  L: AllColors.Orange,
  B: AllColors.Green,
}

const DEFAULT_MEGAMINX_SCHEME: Scheme = {
  U: AllColors.White,
  F: AllColors.Red,
  R: AllColors.Blue,
  dr: AllColors.Pink,
  dl: AllColors["Light Yellow"],
  L: AllColors.Green,
  d: AllColors.Gray,
  br: AllColors["Light Green"],
  BR: AllColors.Yellow,
  BL: AllColors.Purple,
  bl: AllColors["Dark Blue"],
  b: AllColors.Orange
}

const DEFAULT_PYRAMINX_SCHEME: Scheme = {
  left: AllColors.Blue,
  right: AllColors.Green,
  top: AllColors.Yellow,
  back: AllColors.Red,
}

const DEFAULT_SKEWB_SCHEME: Scheme = {
  top: AllColors.Yellow,
  front: AllColors.Blue,
  right: AllColors.Red,
  back: AllColors.Green,
  left: AllColors.Orange,
  bottom: AllColors.White,
}

const DEFAULT_SQUARE1_SCHEME: Scheme = {
  top: AllColors.Yellow,
  front: AllColors.Red,
  right: AllColors.Green,
  back: AllColors.Orange,
  left: AllColors.Blue,
  bottom: AllColors.White,
}

export const DEFAULT_SCHEMES: { [key in Type]: Scheme } = {
  [Type.CUBE]: DEFAULT_CUBE_SCHEME,
  [Type.CUBE_NET]: DEFAULT_CUBE_SCHEME,
  [Type.CUBE_TOP]: DEFAULT_CUBE_SCHEME,
  [Type.MEGAMINX]: DEFAULT_MEGAMINX_SCHEME,
  [Type.MEGAMINX_NET]: DEFAULT_MEGAMINX_SCHEME,
  [Type.MEGAMINX_TOP]: DEFAULT_MEGAMINX_SCHEME,
  [Type.PYRAMINX]: DEFAULT_PYRAMINX_SCHEME,
  [Type.PYRAMINX_NET]: DEFAULT_PYRAMINX_SCHEME,
  [Type.SKEWB]: DEFAULT_SKEWB_SCHEME,
  [Type.SKEWB_NET]: DEFAULT_SKEWB_SCHEME,
  [Type.SQUARE1]: DEFAULT_SQUARE1_SCHEME,
  [Type.SQUARE1_NET]: DEFAULT_SQUARE1_SCHEME,
}