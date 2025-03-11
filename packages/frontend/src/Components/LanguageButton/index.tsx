import { useLayoutEffect,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { Collapse } from 'react-collapse';

import Ukr from '@/assets/ukraine.svg';
import En from '@/assets/england.svg';
import { setLangCookie, getLangCookie } from '@/cookies';
import { default_lang, lang_variants } from '@shared/constants';
import { langTypeT } from '@shared/types';

const LanguageButton = () => {
  const { i18n } = useTranslation();
  const currentLanguage = lang_variants[i18n.language] ? lang_variants[i18n.language] : default_lang as langTypeT;

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

  const langOptions = {
    us: {
      value: 'us' as langTypeT,
      img: En,
    },
    ua: {
      value: 'ua' as langTypeT,
      img: Ukr,
    }
  };

  const actualLang = langOptions[currentLanguage] || langOptions[default_lang];
  const langSelectOptions = [
    {
      value: 'us' as langTypeT,
      img: En,
    },
    {
      value: 'ua' as langTypeT,
      img: Ukr,
    }
  ];

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
