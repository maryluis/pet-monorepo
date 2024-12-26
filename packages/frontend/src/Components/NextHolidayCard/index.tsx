import { useTranslation } from 'react-i18next';

import { isToday } from 'date-fns';
import { useNearestHoliday } from '@/hooks';
import { holidayT } from '@/types';

export const NextHolidayCard = () => {
  const { i18n, t } = useTranslation();
  const currentCode = i18n?.options?.fallbackLng[0] || 'US';
  const nextHoliday: holidayT | null = useNearestHoliday(currentCode);

  const holidayName = nextHoliday?.countryCode === currentCode.toUpperCase() ? nextHoliday?.localName : nextHoliday?.name;
  const holidayDate = nextHoliday?.date;
  const isTodayHoliday = isToday(nextHoliday?.date);

  const topStr = isTodayHoliday ? t('todayHoliday', { holidayName }) : t('nextHoliday', { holidayName, holidayDate });
  const bottomStr = isTodayHoliday ? t('congratulations') : t('dontForgetGifts');

  return (
    <div className="italic font-serif text-xl font-medium p-3">
      {nextHoliday !== null
    && <>
      <h2 style={{ marginRight: '12px' }}>{topStr} </h2>
      <h2 style={{ marginRight: '12px' }}>{bottomStr} </h2>
    </>}
    </div>
  );
};

export default NextHolidayCard;
