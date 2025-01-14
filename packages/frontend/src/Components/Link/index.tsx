import { ReactNode } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import classNames from 'classnames';

import { COLORS_CLASSES } from '@/constants';

interface IProps {
  children: string | ReactNode,
  className?: string,
  path: string,
  underline?: boolean
}

export default function Link(props: IProps) {
  const { children, className = '', path, underline = false } = props;
  const defaultClassName = `text-${COLORS_CLASSES.primaryGreen} hover:text-emerald-600 block`;
  return (
    <ReactLink
      className={classNames(
        { [defaultClassName]: true,
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
