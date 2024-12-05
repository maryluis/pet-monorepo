import type { ReactNode } from 'react';

interface IProps {
  children: ReactNode | string,
  onClick: () => void,
}
const Button = (props: IProps) => {
  const { children, onClick } = props;
  return (
    <button onClick={onClick}>{children}</button>
  );
};

export default Button;
