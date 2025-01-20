export const CountLabel = (props: { count: number, label: string }) => {
  const { count, label } = props;
  return (
    <div className="flex justify-center flex-col items-center max-w-fit">
      <div className="text-emerald-500 text-lg font-bold">{count}</div>
      <div className="font-medium">{label}</div>
    </div>
  );
};

export default CountLabel;
