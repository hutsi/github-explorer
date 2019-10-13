import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import * as styles from './style.css';
import { USERS_LIST } from 'app/gql/queries';
import { useQuery } from '@apollo/react-hooks';

export type Props = {
  onSelect: (user: User) => void;
  onInputFocus: () => void;
}

const UserPreview: FunctionComponent<{ user: User }> = ({ user }) => (
  <div className={styles.UserPreview}>
    <img src={user.avatarUrl} className={styles.Avatar} />
    <div>
      {user.login}
    </div>
  </div>
);

export const UserSearch: FunctionComponent<Props> = ({ onSelect, onInputFocus }) => {
  const [query, setQuery] = useState('');
  const [pagination, setPagination] = useState<Pagination>({ first: 10, last: undefined, before: undefined, after: undefined });

  const { loading, data } = useQuery(USERS_LIST, { variables: { query, ...pagination } });

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={onInputFocus}
        className={styles.Input}
        placeholder="Enter the github username"
      />

      {loading && (
        <div className={styles.Loading}>Loading ...</div>
      )}

      {!loading && data && !!data.search.nodes.length && (
        <div className={styles.Results}>
          <div className={styles.ResultsList}>
            {data.search.nodes.map((item: User, index: number) => (
              <div
                key={index}
                onClick={() => {
                  onSelect(item);
                  setQuery('');
                }}
                className={styles.ResultItem}
              >
                <UserPreview user={item} />
              </div>
            ))}
          </div>
          <div className={styles.Footer}>
            <button
              disabled={!data.search.pageInfo.hasPreviousPage}
              onClick={() => {
                setPagination({
                  first: undefined,
                  last: 10,
                  before: data.search.pageInfo.startCursor,
                  after: undefined,
                });
              }}
            >
              Назад
            </button>
            <button
              disabled={!data.search.pageInfo.hasNextPage}
              onClick={() => {
                setPagination({
                  first: 10,
                  last: undefined,
                  before: undefined,
                  after: data.search.pageInfo.endCursor,
                });
              }}
            >
              Вперед
            </button>
          </div>
        </div>
      )}
    </div>
  )
};
