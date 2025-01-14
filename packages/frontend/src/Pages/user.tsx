import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';

import API from '@/api';
import { useErrors, useAuth, usePrivateAction } from '@/hooks';
import { Checkbox } from '@/components/Input';
import Title from '@/components/Title';
import Card from '@/components/Card';
import { Plus, Minus } from '@/icons';

const UserPage = () => {
  const [spoilerMode, setSpoilerMode] = useState(true);
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
  return (
    <div className="max-w-7xl" style={{ width: '90vw' }}>
      <Card className="min-w-full min-h-72 pt-8">
        <div className="flex justify-between w-8/12">
          <div className="grid" style={{ gridTemplateColumns: '33% 33% 33%', gridTemplateRows: '1fr' }}>
            <Title style={{ gridColumn: '1/4' }}>{data?.nickname}</Title>
            <div>{data?.followersCount}</div>
            <div>{data?.subscribersCount}</div>
            <div onClick={handleSubscribePrivate}>
              {data?.amISubscribed ? <Minus /> : <Plus />}
            </div>
          </div>
          <div>
            <Checkbox
              label="Spoiler mod"
              onChange={handleSetSpoilerMode}
              value={spoilerMode}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserPage;
