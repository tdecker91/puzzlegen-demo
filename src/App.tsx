import './App.css';
import PuzzleGenPNG from './components/PuzzleGenPNG';
import { Type, PNGVisualizerOptions } from 'sr-puzzlegen';
import { useEffect, useState } from 'react';
import { Layout, Typography, Drawer, Button } from 'antd';
import Logo from './components/Logo';
import OptionsForm from './components/OptionsForm';
import ExampleCode from './components/ExampleCode';
import { DEFAULT_SCHEMES } from './data/scheme';
import { DEFAULT_ROTATIONS } from './data/rotations';
import { DEFAULT_PUZZLE_SIZES } from './data/size';
import { MenuOutlined } from "@ant-design/icons";
import { DEFAULT_MASK } from './data/mask';

const { Title } = Typography;

const { Header, Content, Sider } = Layout;

const defaultOptions: PNGVisualizerOptions = {
  width: 250,
  height: 250,
  stroke: .02,
  puzzle: {
    alg: '',
    case: '',
    size: 3,
    scheme: DEFAULT_SCHEMES[Type.CUBE],
    mask: DEFAULT_MASK[Type.CUBE],
    arrows: [],
    rotations: [{
      x: DEFAULT_ROTATIONS[Type.CUBE].x,
      y: DEFAULT_ROTATIONS[Type.CUBE].y,
      z: DEFAULT_ROTATIONS[Type.CUBE].z
    }]
  }
} as any;

function App() {
  const [type, setType] = useState(Type.CUBE);
  const [formValues, setFormValues] = useState<PNGVisualizerOptions>(defaultOptions);
  const [options, setOptions] = useState<PNGVisualizerOptions>(defaultOptions);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  // width to go to mobile view
  const breakpoint = 620;

  const optionsChanged = (newOptions: any) => {
    const values = {
      width: newOptions.width || 0,
      height: newOptions.height || 0,
      strokeWidth: !Number.isNaN(newOptions.stroke) ? newOptions.stroke : .02,
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
        }],
        arrows: newOptions.arrows
      }
    }
    setType(newOptions.puzzle);
    setFormValues(values);
    setOptions(removeUnecessaryOptions(newOptions.puzzle, values as PNGVisualizerOptions));
  }

  const optionsForm = (
    <OptionsForm onApply={optionsChanged} initialValues={formValues} initialType={type}></OptionsForm>
  )

  const drawer = (
    <Drawer
      placement="left"
      visible={drawerOpen}
      style={{ position: 'absolute' }}
      onClose={() => setDrawerOpen(false)}
    >
      {optionsForm}
    </Drawer>
  );

  const sider = (
    <Sider width={350} theme="light" style={{ padding: 5 }}>
      {optionsForm}
    </Sider>
  )

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 20 }}>
        <Button
          onClick={() => setDrawerOpen(!drawerOpen)}
          icon={<MenuOutlined />}
          ghost
          hidden={width >= breakpoint}
        />
        <Logo></Logo>
        <Title>PuzzleGen</Title>
      </Header>
      <Layout>
        {width < breakpoint ? drawer : sider}
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

  if (!options?.puzzle?.arrows || options?.puzzle?.arrows.length === 0) {
    delete displayOptions.puzzle?.arrows;
  }

  if (options.strokeWidth === .02) {
    delete displayOptions.strokeWidth;
  }

  if (JSON.stringify(displayOptions.puzzle) == "{}") {
    delete displayOptions.puzzle;
  }

  return displayOptions;
}

export default App;
