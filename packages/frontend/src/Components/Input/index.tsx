import { UseFormRegister, FieldErrors } from 'react-hook-form';
import classNames from 'classnames';

interface IProps {
  label?: string,
  name?: string,
  onChange: () => void,
  type?: 'text' | 'password',
  value: string,
}

export const Input = (props: IProps) =>{
  const { label = '', name = '', onChange, type = 'text', value } = props;
  return (
    <div className="my-2 flex flex-col">
      <label className="text-emerald-700 text-left my-2">{label}</label>
      <input
        className="disabled:border-slate-200 invalid:border-pink-500 invalid:text-pink-600 h-10 pl-4 shadow-md caret-blue-500 focus:caret-emerald-700 focus:outline-none"
        name={name}
        onChange={onChange}
        type={type}
        value={value}
      />
    </div>
  );
};

interface IReactFormInputProps {
  errors?: FieldErrors,
  label: string
  name: string,
  pattern?: { value: string, }
  register: UseFormRegister,
  required?: boolean,
  type?: 'text' | 'password',
  validate?: () => bool | string,
}

export const ReactFormInput = (props:IReactFormInputProps ) =>{
  const { errors = {}, label, name, pattern = {}, register, required, type = 'text', validate = () => true } = props;
  const isError = errors[name];

  return (
    <div className="my-2 flex flex-col">
      <label className="text-emerald-700 text-left my-2">{label}</label>
      <input
        className={
          classNames({
            'caret-emerald-700': true,
            'outline-none': true,
            'rounded-md': true,
            'transition-all': true,
            'duration-75': true,
            'border-2': isError,
            'pl-4': true,
            'h-10': true,
            'shadow-md': true,
            'border-pink-500': isError,
            'text-pink-600': isError
          })
        }
        name={name}
        {...register(name, { required, pattern, validate })}
        type={type}
      />
    </div>
  );
};

export default Input;
