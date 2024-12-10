export default function Title(props: { children: string }) {
  const { children } = props;
  return (
    <h2 className="font-bold text-2xl mb-2">{children}</h2>
  );
}
