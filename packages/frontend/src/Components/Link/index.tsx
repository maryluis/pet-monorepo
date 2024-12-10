import { Link as ReactLink } from 'react-router-dom';

export default function Link(props: { children: string, path: string }) {
  const { children, path } = props;
  return (
    <ReactLink className="text-emerald-700 underline underline-offset-4 hover:text-emerald-600" to={path}>{children}</ReactLink>
  );
}