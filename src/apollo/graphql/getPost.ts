import { gql } from 'apollo-boost';

import POST_FRAGMENT from './postFragment';

export default gql`
  query GetPost($id: UUID!) {
    post(id: $id) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;

export interface IPostQuery {
  post: IPost;
}
