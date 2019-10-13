import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import * as styles from './style.css';
import { REPO_ISSUES } from 'app/gql/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_ISSUE } from 'app/gql/mutations';

export type Props = {
  owner: string;
  name: string;
  id: string;
}

const IssuePreview: FunctionComponent<{ issue: Issue }> = ({ issue }) => (
  <div className={styles.IssuePreview}>
    <div>
      {issue.title}
    </div>
  </div>
);

export const RepoIssues: FunctionComponent<Props> = ({ owner, name, id }) => {
  const [pagination, setPagination] = useState<Pagination>({ first: 10, last: undefined, before: undefined, after: undefined });

  const { loading, data } = useQuery(REPO_ISSUES, { variables: { owner, name, ...pagination } });
  const [createIssue] = useMutation(CREATE_ISSUE);

  return (
    <div>
      {loading && (
        <div className={styles.Loading}>Loading ...</div>
      )}

      {!loading && data && !!data.repository.issues.nodes.length && (
        <div className={styles.Results}>
          <div className={styles.ResultsList}>
            {data.repository.issues.nodes.map((item: Issue, index: number) => (
              <div
                key={index}
                className={styles.ResultItem}
              >
                <IssuePreview issue={item} />
              </div>
            ))}
          </div>
          <div className={styles.Footer}>
            <button
              disabled={!data.repository.issues.pageInfo.hasPreviousPage}
              onClick={() => {
                setPagination({
                  first: undefined,
                  last: 10,
                  before: data.repository.issues.pageInfo.startCursor,
                  after: undefined,
                });
              }}
            >
              Назад
            </button>
            <button
              onClick={() => {
                createIssue({ variables: { repositoryId: id, title: prompt('Title: ') } }).then((z) => {
                  setPagination({
                    first: undefined,
                    last: 10,
                    before: undefined,
                    after: undefined,
                  });
                });
              }}
            >
              + issue
            </button>
            <button
              disabled={!data.repository.issues.pageInfo.hasNextPage}
              onClick={() => {
                setPagination({
                  first: 10,
                  last: undefined,
                  before: undefined,
                  after: data.repository.issues.pageInfo.endCursor,
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
