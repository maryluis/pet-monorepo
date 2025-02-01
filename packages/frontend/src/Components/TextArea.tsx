import { COLORS_CLASSES } from '@/constants';

interface IProps {
  label?: string,
  name?: string,
  onChange: (e: unknown) => void,
  height?: number,
  value: string,
}

const TextArea = (props: IProps) =>{
  const { label = '', height = 150, name = '', onChange, value } = props;
  return (
    <div className="my-2 flex flex-col">
      <label className={`text-${COLORS_CLASSES.primaryGreen} text-left my-2`}>{label}</label>
      <textarea
        className={`h-10 pl-4 shadow-md caret-blue-500 focus:caret-${COLORS_CLASSES.primaryGreen}`}
        name={name}
        onChange={onChange}
        style={{ height: `${height}px` }}
        value={value}
      />
    </div>
  );
};

export default TextArea;
