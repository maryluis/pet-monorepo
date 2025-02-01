import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import API from '@/api';
import { useAuth, useErrors } from '@/hooks';
import Button from '@/components/Button';
import Paths from '@/paths';

import { IWish } from '@shared/types';

interface IWishCardActionProps {
  item: IWish;
  refreshAction: () => void;
}

export const WishCardActionGuest: React.FC<IWishCardActionProps> = (props:{ item: IWish, refreshAction: () => void } ) => {
  const { item, refreshAction } = props;
  const { isLogged, token, id } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const errorsHandler = useErrors();

  const { mutate: assignWish, isLoading: assignLoading } = useMutation(
    () => API.assignWish(token, (item.id || '')), {
      onSuccess: () => {
        refreshAction();
      },
      onError: (error: Error) => {
        errorsHandler(error);
      },
    }
  );

  const { mutate: cancelAssignWish, isLoading: cancelAssignLoading } = useMutation(
    () => API.cancelAssignWish(token, (item.id || '')), {
      onSuccess: () => {
        refreshAction();
      },
      onError: (error: Error) => {
        errorsHandler(error);
      },
    }
  );

  const handleAssign = () => assignWish();
  const handleCancelAssign = () => cancelAssignWish();

  const renderToDoAction = () => (
    <div><Button disabled={item.isAssigned || item.isReceived} loading={assignLoading} onClick={handleAssign}>{t('toDo')}</Button></div>
  );

  const renderCancelAction = () => (
    <div>
      <Button
        disabled={!item.isAssigned || item.executorId !== id}
        loading={cancelAssignLoading}
        onClick={handleCancelAssign}
      >
        {t('cancel')}
      </Button>
    </div>
  );

  const renderTakenAction = () => (
    <div>Недоступно</div>
  );

  const renderOption = (!item.isAssigned && !item.isReceived)
    ? renderToDoAction
    : item.executorId === id ? renderCancelAction : renderTakenAction;

  if (isLogged) {
    return (
      renderOption()
    );
  }
  return (
    <div className="flex items-end flex-col">
      {t('loginForMoreOptions')}
      <Button type="link" href={Paths.loginWithFallback(location.pathname)}>
        {t('login')}
      </Button>
    </div>
  );
};
