type SelectEditCustomItemProps = {
  onEditCustom: () => void
}

export default function SelectEditCustomItem(props: SelectEditCustomItemProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
      <span
        style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer', color: 'blue' }}
        onClick={props.onEditCustom}
      >
        Edit Custom
      </span>
    </div>
  );
}