import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { UserSearch, UserRepos } from 'app/components';

import * as style from './style.css';
import { RepoIssues } from 'app/components/RepoIssues';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
  }

  export interface State {
    // can't set null here for some reason
    user: User | any,
    repo: Repo | any,
  }
}

export class App extends React.Component<App.Props, App.State> {
  state: App.State = {
    user: null,
    repo: null,
  };

  onUserSelect = (user: User | null) => {
    this.setState({ user });
  };

  onRepoSelect = (repo: Repo | null) => {
    this.setState({ repo });
  };

  render() {
    const { user, repo } = this.state;

    return (
      <div className={style.Container}>
        <h1>Github explorer</h1>
        <div className={style.Section}>
          <div className={style.Label}>Search for the github user:</div>
          <UserSearch
            onSelect={this.onUserSelect}
            onInputFocus={() => {
              this.onUserSelect(null);
              this.onRepoSelect(null);
            }}
          />
        </div>

        {user && (
          <div className={style.Section}>
            <div className={style.Label}>Repositories of user {user.login}:</div>
            <UserRepos
              login={user.login}
              onSelect={this.onRepoSelect}
            />
          </div>
        )}

        {user && repo && (
          <div className={style.Section}>
            <div className={style.Label}>
              Issues in repo {repo.name}:
            </div>
            <RepoIssues
              name={repo.name}
              id={repo.id}
              owner={user.login}
            />
          </div>
        )}
      </div>
    );
  }
}
