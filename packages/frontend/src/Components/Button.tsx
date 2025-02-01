import type { ReactNode, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type onClickT = (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;

interface IProps {
  children: ReactNode | string,
  disabled?: boolean,
  loading?: bool,
  onClick?: onClickT,
  href?: string,
  type?: 'button' | 'link',
}
const Button = (props: IProps) => {
  const { children, disabled = false, loading = false, onClick, href = '', type = 'button' } = props;
  if (type === 'link') {
    return (
      <Link
        to={href}
        className={
          classNames({
            'outline-0 border-0 focus:outline-0 active:outline-0': true,
            'px-2 py-1 h-8 items-center text-center rounded-md inline-block transition-all min-w-24 duration-150': true,
            'bg-emerald-500 text-green-50': true,
            'hover:bg-emerald-700': !loading,
            'hover:text-green-50': true,
            'cursor-progress': loading,
          })
        }
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={
        classNames({
          'outline-0 border-0 focus:outline-0 active:outline-0': true,
          'px-2 py-1 h-9 transition-all min-w-24 duration-150': true,
          'bg-emerald-500 text-green-50': true,
          'hover:bg-emerald-700': !loading,
          'bg-gray-400': disabled,
          'hover:bg-gray-400': disabled,
          'cursor-progress': loading,
        })
      }
      disabled={loading || disabled}
      onClick={onClick}
    >
      { children }
    </button>
  );
};

export default Button;
