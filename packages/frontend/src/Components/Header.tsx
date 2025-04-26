import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PresentLogo } from '@/icons';
import { Paths } from '@/paths';
import Link from '@/components/Link';
import LanguageButton from '@/components/LanguageButton';

export const Header = (props: { children: ReactNode, isLogged: boolean }) => {
  const { children, isLogged } = props;
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toHomePage = () => navigate(Paths.home);
  return (
    <header
      style={{ backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.7)' : 'unset', zIndex: 3 }}
      className="p-3 w-full h-full flex justify-between items-center sticky top-0"
    >
      <div className="cursor-pointer" onClick={toHomePage}>
        <PresentLogo />
      </div>
      <div className="flex items-center">
        {isLogged && <Link className="text-green-50 hover:text-green-100 mr-3" path={Paths.profile}>{t('profile')}</Link>}
        <LanguageButton />
        {children}
      </div>
    </header>
  );
};

export default Header;
