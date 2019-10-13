import { gql } from 'apollo-boost';

export const USERS_LIST = gql`
  query UsersList($query: String!, $first: Int, $last: Int, $after: String, $before: String) {
    search(query: $query, type: USER, first: $first, last: $last, after: $after, before: $before) {
      nodes {
        ... on User {
          id
          name
          avatarUrl
          login
          email
        }
        ... on Organization {
          id
          name
          avatarUrl
          login
          email
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const USER_REPOS = gql`
  query UserRepos($login: String!, $first: Int, $last: Int, $after: String, $before: String) {
    user(login: $login) {
      id
      repositories(first: $first, last: $last, after: $after, before: $before) {
        nodes {
          id
          name
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

export const REPO_ISSUES = gql`
  query UsersList($owner: String!, $name: String!, $first: Int, $last: Int, $after: String, $before: String) {
    repository(name: $name, owner: $owner) {
      id
      issues(first: $first, last: $last, after: $after, before: $before, states: OPEN) {
        nodes {
          title
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

