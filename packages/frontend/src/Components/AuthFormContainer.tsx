import { ReactNode } from 'react';

export const AuthFormContainer = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {children}
    </div>
  );
};

export default AuthFormContainer;
