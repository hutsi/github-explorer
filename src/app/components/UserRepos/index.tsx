import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import * as styles from './style.css';
import { USER_REPOS } from 'app/gql/queries';
import { useQuery } from '@apollo/react-hooks';

export type Props = {
  login: string;
  onSelect: (repo: Repo) => void;
}

const RepoPreview: FunctionComponent<{ repo: Repo }> = ({ repo }) => (
  <div className={styles.RepoPreview}>
    <div>
      {repo.name}
    </div>
  </div>
);

export const UserRepos: FunctionComponent<Props> = ({ login, onSelect }) => {
  const [pagination, setPagination] = useState<Pagination>({ first: 10, last: undefined, before: undefined, after: undefined });

  const { loading, data } = useQuery(USER_REPOS, { variables: { login, ...pagination } });

  return (
    <div>
      {loading && (
        <div className={styles.Loading}>Loading ...</div>
      )}

      {!loading && data && !!data.user.repositories.nodes.length && (
        <div className={styles.Results}>
          <div className={styles.ResultsList}>
            {data.user.repositories.nodes.map((item: Repo, index: number) => (
              <div
                key={index}
                onClick={() => {
                  onSelect(item);
                }}
                className={styles.ResultItem}
              >
                <RepoPreview repo={item} />
              </div>
            ))}
          </div>
          <div className={styles.Footer}>
            <button
              disabled={!data.user.repositories.pageInfo.hasPreviousPage}
              onClick={() => {
                setPagination({
                  first: undefined,
                  last: 10,
                  before: data.user.repositories.pageInfo.startCursor,
                  after: undefined,
                });
              }}
            >
              Назад
            </button>
            <button
              disabled={!data.user.repositories.pageInfo.hasNextPage}
              onClick={() => {
                setPagination({
                  first: 10,
                  last: undefined,
                  before: undefined,
                  after: data.user.repositories.pageInfo.endCursor,
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
