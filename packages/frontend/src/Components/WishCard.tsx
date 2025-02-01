import { useMemo, useState } from 'react';
import { Collapse } from 'react-collapse';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import Card from '@/components/Card';
import { AnchorDown } from '@/icons';

import { IWish } from '@shared/types';

interface IProps {
  ActionComponent: React.ComponentType<{ item: IWish; refreshAction: () => void }>;
  item: IWish;
  refreshAction: () => void;
  spoilerMode: boolean;
};

export const WishCard = (props: IProps) => {
  const { ActionComponent, item, spoilerMode } = props;
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const handleSetOpen = () => setIsOpen(!isOpen);
  const standardText = '';

  const labelColor = useMemo(() => {
    if (!spoilerMode) {
      return 'bg-slate-400';
    } else if (item.isReceived) {
      return 'bg-pink-500';
    } else if (item.isAssigned) {
      return 'bg-orange-500';
    } else {
      return 'bg-emerald-500';
    }
  }, [item, spoilerMode]);

  const labelText = useMemo(() => {
    if (!spoilerMode) {
      return t('spoilerAttention');
    } else if (item.isReceived) {
      return t('completed');
    } else if (item.isAssigned) {
      return t('chosenToDo');
    } else {
      return t('noOneChosen');
    }
  }, [item, spoilerMode, t]);

  return (
    <Card className="w-full max-w-full sm:w-2xl sm:max-w-2xl mb-3 relative">
      <div
        className={`${labelColor} p-2 absolute right-0 top-0 rounded-tr-md text-green-50 min-w-52 text-end`}
      >
        {labelText}
      </div>
      <div className="w-full flex flex-col pt-8">
        <div className="text-emerald-500 text-lg font-bold">{item.title}</div>
        <div className={classNames({ 'text-emerald-500 text-md max-w-full min-h-6': true, 'whitespace-nowrap truncate': !isOpen })}>{item.description || standardText}</div>
      </div>
      <div
        className="absolute flex items-center right-0 bottom-0 p-2 transition-all text-emerald-500 hover:text-emerald-700 cursor-pointer"
        onClick={handleSetOpen}
      >
        {isOpen ? t('close') : t('moreInfo')}
        <div className={classNames({ 'rotate-180': isOpen, 'ml-2': true })}>
          <AnchorDown />
        </div>
      </div>
      <Collapse isOpened={isOpen} theme={{ collapse: 'w-full' }}>
        <div className="flex justify-between w-full py-4">
          <div>{t('inDevelopment')}</div>
          <ActionComponent {...props} />
        </div>
      </Collapse>
    </Card>
  );
};

export default WishCard;