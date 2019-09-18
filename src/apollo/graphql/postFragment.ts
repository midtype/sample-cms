import { gql } from 'apollo-boost';

export default gql`
  fragment PostFragment on Post {
    id
    title
    slug
    body
    section {
      id
      title
    }
    author {
      private {
        name
      }
    }
  }
`;
