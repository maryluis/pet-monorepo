import { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import debounce from 'lodash.debounce';
import classNames from 'classnames';

import { useErrors, useAuth } from '@/hooks';
import { API } from '@/api';
import Card from '@/components/Card';
import ResultsScrollContainer from '@/components/ResultsScrollContainer';
import Input from '@/components/Input';
import Link from '@/components/Link';
import Title from '@/components/Title';
import Paths from '@/paths';

type usersResultsT = { id: string, nickname: string };

type extendedUserResultsT = usersResultsT & {
  isLast?: boolean;
  isMe: boolean,
};

const ResultComponent = (props: extendedUserResultsT) => {
  return (
    <Link
      className={classNames(
        { 'block p-2 text-slate-500': true,
          'border-b-2 border-current border-solid': !props.isLast
        })
      }
      path={props.isMe ? Paths.profile : Paths.userByNickname(props.nickname)}
    >
      {props.nickname}
    </Link>
  );
};

const HomePage = () => {
  const { t } = useTranslation();
  const errorsHandler = useErrors();
  const { isLogged, id } = useAuth();

  const [users, setUsers] = useState<usersResultsT[]>([]);
  const [noResults, setNoResults] = useState(false);

  const [ search, setSearch ] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleChangeSearch = (e) => debouncedSearch(e.target.value);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearch(query);
      setPage(1);
      if (query === '') {
        setUsers([]);
      }
    }, 500),
    []
  );
  const { ref: loadMoreRef } = useInView({
    triggerOnce: false,
    onChange: debounce((inView) => {
      if (inView && !isLoading && !isFetching && hasMore && search) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 500),
  });

  const { isLoading, isFetching } = useQuery(
    ['users', search, page],
    () => API.getUsersByParticularSearch(search, page),
    {
      enabled: !!search,
      onSuccess: (res) => {
        if (page === 1) {
          if (res.users.length) {
            setUsers(res.users);
            setNoResults(false);
          } else {
            setUsers([]);
            setNoResults(true);
          }
        } else {
          setUsers((prevUsers) => [...prevUsers, ...res.users]);
        }
        setHasMore(res.hasMore);
      },
      onError: async (err: Error) => {
        setNoResults(true);
        errorsHandler(err);
      }
    }
  );

  return (
    <div className="max-w-7xl" style={{ width: '90vw' }}>
      <Card className="min-w-full min-h-72">
        <div className="flex flex-col w-full">
          <div className="flex justify-center">
            <Title>{t('findOutWishes')}</Title>
          </div>
          <Input onChange={handleChangeSearch} placeholder={t('enterPersonNickname')} />
          <ResultsScrollContainer
            hasItems={!!users.length}
            noResults={noResults}
            loading={isLoading || isFetching}
          >
            {users.map((item, i) => (
              <ResultComponent key={item.id} isMe={isLogged && (id === item.id)} nickname={item.nickname} isLast={i === users.length - 1} />
            ))}
            <div ref={loadMoreRef} />
          </ResultsScrollContainer>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
