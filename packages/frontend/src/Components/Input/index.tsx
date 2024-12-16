interface IProps {
  label?: string,
  name?: string,
  onChange: () => void,
  type?: 'text' | 'password',
  value: string,
}

const Input = (props: IProps) =>{
  const { label = '', name = '', onChange, type = 'text', value } = props;
  return (
    <div className="my-2 flex flex-col">
      <label className="text-emerald-700 text-left my-2">{label}</label>
      <input
        className="h-10 pl-4 shadow-md caret-blue-500 focus:caret-emerald-700"
        name={name}
        onChange={onChange}
        type={type}
        value={value}
      />
    </div>
  );
};

export default Input;
