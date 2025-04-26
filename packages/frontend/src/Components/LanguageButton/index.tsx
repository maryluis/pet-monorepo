import { useLayoutEffect,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { Collapse } from 'react-collapse';

import Ukr from '@/assets/ukraine.svg';
import En from '@/assets/england.svg';
import { setLangCookie, getLangCookie } from '@/cookies';
import { default_lang } from '@shared/constants';
import { langTypeT } from '@shared/types';

const LanguageButton = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as langTypeT || 'en' as langTypeT;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const changeLanguage = async (lng: langTypeT = default_lang) => {
    i18n.changeLanguage(lng);
    await setLangCookie(lng);
    setOpen(false);
  };

  useLayoutEffect(() => {
    const setLang = async () => {
      const langCookie = await getLangCookie();
      if (langCookie && langCookie !== currentLanguage ) {
        changeLanguage(langCookie);
      }
    };
    setLang();
  }, [currentLanguage, i18n]);

  type LangOption = {
    value: langTypeT;
    img: string;
  };

  const langOptions: Record<langTypeT, LangOption> = {
    us: {
      value: 'us' as langTypeT,
      img: En,
    },
    ua: {
      value: 'ua' as langTypeT,
      img: Ukr,
    }
  };

  const actualLang = langOptions[currentLanguage] as { value: langTypeT, img: string };
  const langSelectOptions = Object.values(langOptions);

  return (
    <div className="relative mr-3">
      <img
        onClick={handleOpen}
        src={actualLang?.img}
      />
      <div style={{ position: 'absolute', top: 'calc(100% + 10px)' }}>
        <Collapse isOpened={open} >
          <div>
            {(langSelectOptions || []).map((item) => {
              if (item.value !== actualLang.value) return (
                <img
                  key={`langOpt${item.value}`}
                  onClick={() => changeLanguage(item.value)}
                  src={item.img}
                />
              );
              return null;
            })
            }
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default LanguageButton;
