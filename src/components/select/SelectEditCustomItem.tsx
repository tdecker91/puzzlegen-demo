import { Divider, Input } from "antd";

type SelectEditCustomItemProps = {
  onEditCustom: () => void
}

export default function SelectEditCustomItem(props: SelectEditCustomItemProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
      <a
        style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
        onClick={props.onEditCustom}
      >
        Edit Custom
      </a>
    </div>
  );
}