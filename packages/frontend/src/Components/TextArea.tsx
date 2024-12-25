interface IProps {
  label?: string,
  name?: string,
  onChange: () => void,
  height?: number,
  value: string,
}

const TextArea = (props: IProps) =>{
  const { label = '', height = 150, name = '', onChange, value } = props;
  return (
    <div className="my-2 flex flex-col">
      <label className="text-emerald-700 text-left my-2">{label}</label>
      <textarea
        className="h-10 pl-4 shadow-md caret-blue-500 focus:caret-emerald-700"
        name={name}
        onChange={onChange}
        style={{ height: `${height}px` }}
        value={value}
      />
    </div>
  );
};

export default TextArea;
