import { gql } from 'apollo-boost';

import POST_FRAGMENT from './postFragment';

export default gql`
  mutation DeletePost($id: UUID!) {
    deletePost(input: { id: $id }) {
      post {
        ...PostFragment
      }
    }
  }
  ${POST_FRAGMENT}
`;
