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
          'outline-0 border-0 focus:outline-0 active:outline-0': true,
          'px-2 py-1 h-9 transition-all min-w-24 duration-150': true,
          'bg-emerald-500 text-green-50': true,
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
