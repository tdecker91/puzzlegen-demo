import { Type, Algorithm } from "sr-puzzlegen";
import { Turn } from "sr-puzzlegen/dist/lib/algorithms/algorithm";
import { Square1Move, Square1Simualtor } from "sr-puzzlegen/dist/lib/simulator/square1/square1Simulator";

export function algorithmValid(type: Type, alg: string): { valid: boolean, errorMessage?: string } {
  if (!alg || alg.trim() === "") {
    return {
      valid: true
    };
  }

  try {
    parseAlg(type, alg);
    return {
      valid: true
    }
  } catch (e) {
    let message = "invalid algorithm"
    if (e instanceof Error) message = e.message;
    return {
      valid: false,
      errorMessage: message
    }
  }
}

function parseAlg(type: Type, alg: string): Turn[] | Square1Move[] {
  switch (type) {
    case Type.CUBE:
    case Type.CUBE_NET:
    case Type.CUBE_TOP:
      return Algorithm.parseCubeAlgorithm(alg);
    case Type.MEGAMINX:
    case Type.MEGAMINX_NET:
    case Type.MEGAMINX_TOP:
      return Algorithm.parseMegaminxAlgorithm(alg);
    case Type.PYRAMINX:
    case Type.PYRAMINX_NET:
      return Algorithm.parsePyraminxAlgorithm(alg);
    case Type.SKEWB:
    case Type.SKEWB_NET:
      return Algorithm.parseSkewbAlgorithm(alg);
    case Type.SQUARE1:
    case Type.SQUARE1_NET:
      let sim = new Square1Simualtor();
      sim.alg(alg);

      // sim validated the alg without error
      return [];
  }
}