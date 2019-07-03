import { gql } from 'apollo-boost';

import PAGE_FRAGMENT from './pageFragment';

export default gql`
  mutation SetPage(
    $id: UUID!
    $title: String
    $description: String
    $slug: String
    $template: String
  ) {
    updatePage(
      input: {
        id: $id
        patch: {
          title: $title
          description: $description
          slug: $slug
          template: $template
        }
      }
    ) {
      page {
        ...PageFragment
      }
    }
  }
  ${PAGE_FRAGMENT}
`;

export interface ISetPageMutation {
  updatePage: {
    page: IPage;
  };
}
