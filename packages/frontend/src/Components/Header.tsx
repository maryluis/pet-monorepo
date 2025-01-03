import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { PresentLogo } from '@/icons';
import { Paths } from '@/paths';
import LanguageButton from '@/components/LanguageButton';

export const Header = (props: { children: ReactNode }) => {
  const { children } = props;
  const navigate = useNavigate();

  const toHomePage = () => navigate(Paths.home);
  return (
    <header style={{ 'hover:backgroundColor': 'rgba(0, 0, 0, 0.2)', }} className="p-3 w-full h-full flex justify-between items-center">
      <div className="cursor-pointer" onClick={toHomePage}>
        <PresentLogo />
      </div>
      <div className="flex items-center">
        <LanguageButton />
        {children}
      </div>
    </header>
  );
};

export default Header;
