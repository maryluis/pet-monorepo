export default function Title(props: { children: string, style?: {[key: string]: string }}) {
  const { children, style = {} } = props;
  return (
    <h2 className="font-bold text-2xl mb-2" style={{ ...style }}>{children}</h2>
  );
}
