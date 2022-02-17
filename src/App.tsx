import './App.css';
import PuzzleGenPNG from './components/PuzzleGenPNG';
import { Type, PNGVisualizerOptions } from 'sr-puzzlegen';
import { useState } from 'react';
import { Layout, Typography } from 'antd';
import Logo from './components/Logo';
import OptionsForm from './components/OptionsForm';
import ExampleCode from './components/ExampleCode';
import { DEFAULT_SCHEMES } from './data/scheme';
import { DEFAULT_ROTATIONS } from './data/rotations';
import { DEFAULT_PUZZLE_SIZES } from './data/size';

const { Title } = Typography;

const { Header, Content, Sider } = Layout;

function App() {
  const [type, setType] = useState(Type.CUBE);
  const [options, setOptions] = useState<PNGVisualizerOptions>({ width: 250, height: 250 });

  const optionsChanged = (newOptions: any) => {
    setType(newOptions.puzzle);
    setOptions(removeUnecessaryOptions(newOptions.puzzle, {
      width: newOptions.width,
      height: newOptions.height,
      puzzle: {
        alg: newOptions.alg,
        case: newOptions.case,
        scheme: newOptions.scheme,
        size: newOptions.size,
        mask: newOptions.mask,
        stickerColors: newOptions.stickerColors,
        rotations: [{
          x: newOptions.X,
          y: newOptions.Y,
          z: newOptions.Z
        }]
      }
    } as PNGVisualizerOptions))
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 20 }}>
        <Logo></Logo>
        <Title>PuzzleGen Demo App</Title>
      </Header>
      <Layout>
        <Sider width={350} theme="light" style={{ padding: 5 }}>
          <OptionsForm onApply={optionsChanged}></OptionsForm>
        </Sider>
        <Content style={{ padding: '25px 25px' }} className="puzzle-preview">
          <PuzzleGenPNG type={type} options={options} />
          <Content style={{ padding: '25px 0px' }}>
            <ExampleCode type={type} options={options}></ExampleCode>
          </Content>
        </Content>
      </Layout>
    </Layout>
  );
}

const removeUnecessaryOptions = (type: Type, options?: any): PNGVisualizerOptions => {
  const displayOptions = {
    ...JSON.parse(JSON.stringify(options))
  }

  if (DEFAULT_SCHEMES[type] === options?.puzzle?.scheme) {
    delete displayOptions.puzzle?.scheme
  }

  if (Array.isArray(options?.puzzle?.rotations)
    && options?.puzzle?.rotations.length == 1
    && JSON.stringify(DEFAULT_ROTATIONS[type]) === JSON.stringify(options?.puzzle?.rotations[0])) {
    delete displayOptions.puzzle?.rotations
  }

  if (!options?.puzzle?.size) {
    delete displayOptions.puzzle?.size;
  }

  if (!options?.puzzle?.alg) {
    delete displayOptions.puzzle?.alg;
  }

  if (!options?.puzzle?.case) {
    delete displayOptions.puzzle?.case;
  }

  if (!options?.puzzle?.stickerColors) {
    delete displayOptions.puzzle?.stickerColors;
  }

  if (type == Type.SQUARE1
    || type == Type.SQUARE1_NET
    || type == Type.SKEWB
    || type == Type.SKEWB_NET
    || displayOptions.puzzle?.size == DEFAULT_PUZZLE_SIZES[type]) {
    delete displayOptions.puzzle?.size;
  }

  if (JSON.stringify(displayOptions.puzzle) == "{}") {
    delete displayOptions.puzzle;
  }

  return displayOptions;
}

export default App;
