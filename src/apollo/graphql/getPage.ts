import { gql } from 'apollo-boost';

import PAGE_FRAGMENT from './pageFragment';

export default gql`
  query GetPage($id: UUID!) {
    page(id: $id) {
      ...PageFragment
    }
  }
  ${PAGE_FRAGMENT}
`;

export interface IPageQuery {
  page: IPage;
}
