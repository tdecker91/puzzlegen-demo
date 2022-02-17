import { Face, PUZZLE_FACES } from './face';
import { Type, Masks } from 'sr-puzzlegen';

export type Mask = {
  [face: string]: number[];
}

type DefaultMasks = { [key in Type]: Mask };

export const DEFAULT_MASK: DefaultMasks = 
  /**
   * For each puzzle create an empty mask, which is just
   * every face of the puzzle mapped to an empty array
   * 
   * ex {
   *    "cube": {
   *      U: [],
   *      R: [],
   *      ...
   *    }
   * }
   */
  Object.keys(PUZZLE_FACES)
    .map((type: string) => [
        type as Type,
        PUZZLE_FACES[type as Type].reduce((prev, face) => ({
          ...prev,
          [face]: []
        }), {})
      ])
    .reduce((prev, [type, faces]) => ({
      ...prev,
      [type as Type]: faces
    }), {} as DefaultMasks);

export function getMasks(puzzle: Type): { [mask: string]: any } {
  switch(puzzle) {
    case Type.CUBE:
    case Type.CUBE_NET:
    case Type.CUBE_TOP:
      return Masks.CUBE_3;
    case Type.MEGAMINX:
    case Type.MEGAMINX_NET:
    case Type.MEGAMINX_TOP:
      return Masks.MEGA_3;
    default:
      return {};
  }
}