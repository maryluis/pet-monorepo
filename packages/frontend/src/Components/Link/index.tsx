import { ReactNode } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import classNames from 'classnames';

interface IProps {
  children: string | ReactNode,
  className?: string,
  path: string,
  underline?: boolean
}

export default function Link(props: IProps) {
  const { children, className = '', path, underline = false } = props;
  return (
    <ReactLink
      className={classNames(
        { 'text-emerald-700 hover:text-emerald-600 block': true,
          'underline underline-offset-4': underline,
          [className]: true,
        }
      )}
      to={path}
    >
      {children}
    </ReactLink>
  );
}
