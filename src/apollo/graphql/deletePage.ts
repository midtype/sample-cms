import { gql } from 'apollo-boost';

import PAGE_FRAGMENT from './pageFragment';

export default gql`
  mutation DeletePage($id: UUID!) {
    deletePage(input: { id: $id }) {
      page {
        ...PageFragment
      }
    }
  }
  ${PAGE_FRAGMENT}
`;

export interface IDeletePageMutation {
  createPage: {
    page: IPage;
  };
}
