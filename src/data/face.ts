import { Type } from 'sr-puzzlegen';
export type Face = string;

const CUBE_FACES: Face[] = [
  "U",
  "R",
  "F",
  "D",
  "L",
  "B",
];

const MEGAMINX_FACES: Face[] = [
  "U",
  "R",
  "F",
  "dr",
  "dl",
  "L",
  "d",
  "br",
  "BR",
  "BL",
  "bl",
  "b"
];

const PYRAMINX_FACES: Face[] = [
  "left",
  "right",
  "top",
  "back",
]

const SKEWB_FACES: Face[] = [
  "top",
  "right",
  "front",
  "bottom",
  "left",
  "back"
];

const SQUARE1_FACES: Face[] = [
  "top",
  "right",
  "front",
  "bottom",
  "left",
  "back"
];

export const PUZZLE_FACES: { [key in Type]: Face[] } = {
  [Type.CUBE]: CUBE_FACES,
  [Type.CUBE_NET]: CUBE_FACES,
  [Type.CUBE_TOP]: CUBE_FACES,
  [Type.MEGAMINX]: MEGAMINX_FACES,
  [Type.MEGAMINX_NET]: MEGAMINX_FACES,
  [Type.MEGAMINX_TOP]: MEGAMINX_FACES,
  [Type.PYRAMINX]: PYRAMINX_FACES,
  [Type.PYRAMINX_NET]: PYRAMINX_FACES,
  [Type.SKEWB]: SKEWB_FACES,
  [Type.SKEWB_NET]: SKEWB_FACES,
  [Type.SQUARE1]: SQUARE1_FACES,
  [Type.SQUARE1_NET]: SQUARE1_FACES,
}