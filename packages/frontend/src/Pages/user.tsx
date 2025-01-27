import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';

import API from '@/api';
import { useErrors, useAuth, usePrivateAction } from '@/hooks';
import { Checkbox } from '@/components/Input';
import WishCard from '@/components/WishCard';
import Button from '@/components/button';
import CountLabel from '@/components/CountLabel';
import Title from '@/components/Title';
import Card from '@/components/Card';
import { WishCardActionGuest } from '@/components/WishCardActionComponents';

const UserPage = () => {
  const { t } = useTranslation();
  const [spoilerMode, setSpoilerMode] = useState(false);
  const handleSetSpoilerMode = useCallback(() => {
    setSpoilerMode(prevState => !prevState);
  }, [spoilerMode]);

  const { token } = useAuth();

  const { nickname } = useParams();
  const errorsHandler = useErrors();

  const { data, refetch } = useQuery(
    ['user', token],
    () => API.getUserByNickname(nickname, token),
    {
      enabled: !!nickname || typeof token !== 'string',
      onError: async (err: Error) => {
        errorsHandler(err);
      }
    }
  );

  const { data: wishesData, refetch: refreshWishes } = useQuery(
    ['wishes'],
    () => API.getWishes(data.id),
    {
      enabled: !!data,
      onError: async (err: Error) => {
        errorsHandler(err);
      }
    }
  );

  const handleRefetch = () => {
    refreshWishes();
  };

  const { mutate: followUser } = useMutation(
    (followedId: string) => API.followUser(followedId, token), {
      onSuccess: async () => {
        refetch();
      },
      onError: async (error: Error) => {
        await errorsHandler(error);
      },
    }
  );

  const { mutate: unFollowUser } = useMutation(
    (followedId: string) => API.unFollowUser(followedId, token), {
      onSuccess: async () => {
        refetch();
      },
      onError: async (error: Error) => {
        await errorsHandler(error);
      },
    }
  );

  const handleSubscribe = () => {
    const action = data?.amISubscribed ? unFollowUser : followUser;
    action(data.id);
  };
  const handleSubscribePrivate = usePrivateAction(handleSubscribe);

  const subscribeButtonTitle = data?.amISubscribed ? t('unfollow') : t('follow');
  return (
    <div className="max-w-7xl" style={{ width: '90vw' }}>
      <Card className="min-w-full min-h-72 sm:p-10 p-4">
        <div className="w-full">
          <div className="grid sm:w-11/12 grid-cols-3 sm:grid-cols-4 gap-2.5 w-full max-w-2xl justify-start"
          >
            <Title className="col-start-1 col-end-4 sm:col-end-5">{data?.nickname}</Title>
            <CountLabel count={data?.followersCount} label={t('followers')} />
            <CountLabel count={data?.subscribersCount} label={t('subscriptions')} />
            <CountLabel count={data?.wishesCount} label={t('wishes')} />
            <div className="flex justify-end flex-col items-stretch col-start-1 col-end-4 sm:col-start-4 sm:col-end-5" >
              <Button onClick={handleSubscribePrivate}>{subscribeButtonTitle}</Button>
            </div>
          </div>
          <Checkbox
            label={t('spoilerMode')}
            onChange={handleSetSpoilerMode}
            value={spoilerMode}
          />
          {(wishesData?.wishes || []).map((item) => (
            <WishCard
              ActionComponent={WishCardActionGuest}
              item={item}
              key={item.id}
              refreshAction={handleRefetch}
              spoilerMode={spoilerMode}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserPage;
