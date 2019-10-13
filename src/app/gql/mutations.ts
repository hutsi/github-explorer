import { gql } from 'apollo-boost';

export const CREATE_ISSUE = gql`
  mutation CreateIssue($repositoryId: ID!, $title: String!) {
    createIssue(input: { repositoryId: $repositoryId, title: $title }) {
      clientMutationId,
      issue {
        id
      }
    }
  }
`;

