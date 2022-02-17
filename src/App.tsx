import './App.css';
import PuzzleGenPNG from './components/PuzzleGenPNG';
import { Type, PNGVisualizerOptions } from 'sr-puzzlegen';
import { useState } from 'react';
import { Layout, Typography } from 'antd';
import Logo from './components/Logo';
import OptionsForm from './components/OptionsForm';
import ExampleCode from './components/ExampleCode';

const { Title } = Typography;

const { Header, Content, Sider } = Layout;

function App() {
  const [type, setType] = useState(Type.CUBE);
  const [options, setOptions] = useState<PNGVisualizerOptions>({ width: 250, height: 250 });

  const optionsChanged = (newOptions: any) => {
    setType(newOptions.puzzle);
    setOptions({
      width: newOptions.width,
      height: newOptions.height,
      puzzle: {
        alg: newOptions.alg,
        case: newOptions.case,
        scheme: newOptions.scheme,
        mask: newOptions.mask,
        stickerColors: newOptions.stickerColors,
        rotations: [{
          x: newOptions.X,
          y: newOptions.Y,
          z: newOptions.Z
        }]
      }
    } as PNGVisualizerOptions)
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
        <Content className="puzzle-preview">
          <PuzzleGenPNG type={type} options={options} />
          <ExampleCode></ExampleCode>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
