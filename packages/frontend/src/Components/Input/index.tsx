import { type ChangeEvent } from 'react';
import { FieldValues,
  FieldErrors,
  UseFormRegister,
  FieldPath, } from 'react-hook-form';
import classNames from 'classnames';

import { COLORS_CLASSES } from '@/constants';

interface IProps {
  label?: string,
  name?: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  type?: 'text' | 'password',
  value?: string,
}

export const Input = (props: IProps) =>{
  const { label = '', name = '', onChange, placeholder, type = 'text', value } = props;
  return (
    <div className="my-2 flex flex-col">
      <label className={`text-${COLORS_CLASSES.primaryGreen} text-left my-2`}>{label}</label>
      <input
        className={`disabled:border-slate-200 invalid:border-pink-500 invalid:text-pink-600 h-10 pl-4 shadow-md caret-blue-500 focus:caret-${COLORS_CLASSES.primaryGreen} focus:outline-none`}
        name={name}
        style={{ backgroundColor: 'transparent', color: 'black', }}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
};

interface IReactFormInputProps<T extends FieldValues> {
  autocomplete?: string;
  errors?: FieldErrors<T>;
  label: string;
  name: FieldPath<T>;
  pattern?: {
    value: RegExp;
    message: string;
  };
  register: UseFormRegister<T>;
  required?: boolean;
  type?: 'text' | 'password';
  validate?: (value: string) => boolean | string;
}

export const ReactFormInput = <T extends FieldValues>(props: IReactFormInputProps<T>) => {
  const { autocomplete = '', errors, label, name, pattern, register, required, type = 'text', validate = () => true } = props;
  const isError = errors && errors[name];

  const caretClassName = `caret-${COLORS_CLASSES.primaryGreen}`;

  return (
    <div className="my-2 flex flex-col ">
      <label className={`text-${COLORS_CLASSES.primaryGreen} text-left my-2`}>{label}</label>
      <input
        autoComplete={autocomplete}
        className={
          classNames({
            [caretClassName]: true,
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
        style={{ backgroundColor: 'transparent', color: 'black', }}
        {...register(name, {
          required,
          ...(pattern && { pattern }),
          validate
        })}
        type={type}
      />
    </div>
  );
};

interface ICheckboxInputProps {
  label?: string,
  onChange: () => void,
  value: boolean,
}

export const Checkbox = (props: ICheckboxInputProps) => {
  const { label = '', onChange, value } = props;

  return (
    <div className="my-2 flex flex-col">
      <label className={'text-emerald-700 text-left my-2'}>{label}</label>
      <div className="h-2 w-12 bg-slate-200 rounded-lg relative input-checkbox">
        <div
          className="absolute h-4 w-4 rounded-2xl"
          style={{
            top: '-50%',
            left: value ? 'calc(100% - 16px)' : '0px',
          }}
        />
        <input
          className="absolute w-full h-full z-10 opacity-0 cursor-pointer"
          onChange={onChange}
          type="checkbox"
          checked={value}
        />
      </div>
    </div>
  );
};

export default Input;
