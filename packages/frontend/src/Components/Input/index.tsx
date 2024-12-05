interface IProps {
  label?: string,
  onChange: () => void,
  type?: 'text' | 'password',
  value: string,
}

const Input = (props: IProps) =>{
  const { label = '', onChange, type = 'text', value } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label>{label}</label>
      <input
        onChange={onChange}
        type={type}
        value={value}
      />
    </div>
  );
};

export default Input;
