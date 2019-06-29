import { gql } from 'apollo-boost';

import PAGE_FRAGMENT from './pageFragment';

export default gql`
  query GetPages {
    pages {
      nodes {
        ...PageFragment
      }
    }
  }
  ${PAGE_FRAGMENT}
`;

export interface IPages {
  pages: {
    nodes: IPage[];
  };
}
