import type { ReactNode } from 'react';
import classNames from 'classnames';

interface IProps {
  children: ReactNode | string,
  loading?: bool,
  onClick: () => void,
}
const Button = (props: IProps) => {
  const { children, loading = false, onClick } = props;
  return (
    <button
      className={
        classNames({
          'outline-0': true,
          'border-0': true,
          'focus:outline-0': true,
          'active:outline-0': true,
          'px-2': true,
          'py-1 ': true,
          'h-9': true,
          'transition-all': true,
          'min-w-24': true,
          'duration-150': true,
          'bg-emerald-500 ': true,
          'text-green-50': true,
          'hover:bg-emerald-700': !loading,
          'cursor-progress': loading,
        })
      }
      disabled={loading}
      onClick={onClick}
    >
      { children }
    </button>
  );
};

export default Button;
