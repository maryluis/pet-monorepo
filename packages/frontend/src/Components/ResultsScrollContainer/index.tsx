import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import Loader from '@/components/Loader';

interface IProps {
  children: ReactNode,
  hasItems: boolean,
  noResults: boolean,
  loading?: boolean,
}

export const ResultsScrollContainer = (props: IProps) => {
  const { loading = false, hasItems, noResults, children } = props;

  const { t } = useTranslation();
  if (!loading && !hasItems && !noResults) return null;
  return (
    <div className="bg-white border-2 border-solid divide-current overscroll overflow-scroll max-h-80 p-1">
      {children}
      {noResults && <div className="flex justify-center text-slate-500">
        {t('noResults')}
      </div>}
      {loading && <div className="flex justify-center"><Loader /></div>}
    </div>
  );
};

export default ResultsScrollContainer;
