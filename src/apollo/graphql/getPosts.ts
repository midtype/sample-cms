import { gql } from 'apollo-boost';

import POST_FRAGMENT from './postFragment';

export default gql`
  query GetPosts {
    posts {
      nodes {
        ...PostFragment
      }
    }
  }
  ${POST_FRAGMENT}
`;

export interface IPosts {
  posts: {
    nodes: IPost[];
  };
}
