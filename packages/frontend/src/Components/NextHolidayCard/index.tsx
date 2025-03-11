import { useTranslation } from 'react-i18next';
import { isToday } from 'date-fns';

import { useNearestHoliday } from '@/hooks';
import { holidayT } from '@/types';

import { langTypeT } from '@shared/types';
import { default_lang, lang_variants } from '@shared/constants';

export const NextHolidayCard = () => {
  const { i18n, t } = useTranslation();
  const currentCode = lang_variants[i18n.language] ? lang_variants[i18n.language] : default_lang as langTypeT;
  const nextHoliday: holidayT | null = useNearestHoliday(currentCode);

  const holidayName = nextHoliday?.countryCode === currentCode.toUpperCase() ? nextHoliday?.localName : nextHoliday?.name;
  const holidayDate = nextHoliday?.date;
  const isTodayHoliday = isToday((nextHoliday?.date || ''));

  const topStr = isTodayHoliday ? t('todayHoliday', { holidayName }) : t('nextHoliday', { holidayName });
  const bottomStr = isTodayHoliday ? t('congratulations') : t('dontForgetGifts');

  return (
    <div
      className="italic font-serif text-xl font-medium p-3 text-amber-50 text-balance"
      style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 30)' }}
    >
      {nextHoliday !== null
    && <>
      <div className="mb-2.5">
        <h2 className="text-4xl">{topStr} </h2>
        {!isTodayHoliday && <h2 className="text-3xl">{t('nextHolidayDate', { holidayDate })}</h2>}
      </div>
      <h2>{bottomStr} </h2>
    </>}
    </div>
  );
};

export default NextHolidayCard;
