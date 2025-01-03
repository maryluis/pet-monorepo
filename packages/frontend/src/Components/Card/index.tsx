import { ReactNode } from 'react';

export default function Card(props: { className?: string, children: ReactNode }) {
  const { className = '', children } = props;
  return (
    <div className={`rounded-md shadow-xl flex flex-col items-center bg-slate-50 p-4 max-w-md w-11/12 ${className}`}>
      {children}
    </div>
  );
};