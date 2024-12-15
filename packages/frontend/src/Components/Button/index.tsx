import type { ReactNode } from 'react';

interface IProps {
  children: ReactNode | string,
  onClick: () => void,
}
const Button = (props: IProps) => {
  const { children, onClick } = props;
  return (
    <button
      className="px-2 py-1 h-9 transition ease-in-out delay-150 bg-emerald-500 hover:-translate-y-1 hover:scale-110 hover:bg-emerald-700 duration-300 text-green-50 outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
