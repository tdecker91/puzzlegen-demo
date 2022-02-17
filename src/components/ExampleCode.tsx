import React from "react"
import { CopyBlock, vs2015 } from "react-code-blocks"
import { PNGVisualizerOptions, Type } from "sr-puzzlegen";
import { DEFAULT_ROTATIONS } from "../data/rotations";
import { DEFAULT_SCHEMES } from "../data/scheme";
import { PuzzleGenProps } from "./PuzzleGenPNG"

/**
 * Component to display example code to render puzzle
 * given the puzzle options.
 */
class ExampleCode extends React.Component<PuzzleGenProps> {
  render() {
    return (
      <CopyBlock
        text={makePuzzleGenCode(this.props.type, this.props.options)}
        language="javascript"
        theme={vs2015}
      />
    )
  }
}

/**
 * returns a code block example to render the puzzle with the 
 * given type and options
 */
const makePuzzleGenCode = (type: Type, options?: PNGVisualizerOptions) => `import { PNG, Type } from "sr-puzzlegen"

let type = "${type}";
let options = ${prettyPrintArray(options)};

PNG("#div", type, options);
`;

/**
 * Pretty print json object with a tab indentation. But this 
 * will format arrays onto a single line.
 */
const prettyPrintArray = (json: any, indentation: number = 2): string => {
  if (typeof json === 'string') {
    json = JSON.parse(json);
  }
  const output = JSON.stringify(json, function (k, v) {
    if (v instanceof Array)
      return JSON.stringify(v);
    return v;
  }, indentation).replace(/\\/g, '')
    .replace(/\"\[/g, '[')
    .replace(/\]\"/g, ']')
    .replace(/\"\{/g, '{')
    .replace(/\}\"/g, '}');

  return output;
}

export default ExampleCode