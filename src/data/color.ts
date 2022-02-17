import { Face } from './face';
import { IColor } from "sr-puzzlegen/dist/lib/geometry/color";
import { Colors } from "sr-puzzlegen";

export interface NamedColor extends IColor {
  name: string;
}

export const AllColors: { [color: string]: NamedColor } = {
  Red: {...Colors.RED, name: "RED"},
  Orange: {...Colors.ORANGE, name:"ORANGE"},
  Yellow: {...Colors.YELLOW, name:"YELLOW"},
  Green: {...Colors.GREEN, name:"GREEN"},
  Blue: {...Colors.BLUE, name:"BLUE"},
  White: {...Colors.WHITE, name:"WHITE"},
  "Light Yellow": {...Colors.LIGHT_YELLOW, name:"LIGHT_YELLOW"},
  "Light Green": {...Colors.LIGHT_GREEN, name:"LIGHT_GREEN"},
  "Dark Blue": {...Colors.DARK_BLUE, name:"DARK_BLUE"},
  "Pink": {...Colors.PINK, name:"PINK"},
  "Purple": {...Colors.PURPLE, name:"PURPLE"},
  "Gray": {...Colors.GREY, name:"GREY"},
  "Black": {...Colors.BLACK, name:"BLACK"}
}

export type StickerColors = {
  [face: string]: NamedColor[];
}