export default function Title(props: { children: string, className?: string, style?: {[key: string]: string }}) {
  const { children, className = '', style = {} } = props;
  return (
    <h2 className={`font-bold text-2xl mb-2 ${className}`} style={{ ...style }}>{children}</h2>
  );
}
