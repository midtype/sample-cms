import { gql } from 'apollo-boost';

import PAGE_FRAGMENT from './pageFragment';

export default gql`
  mutation CreatePage(
    $title: String
    $description: String
    $slug: String
    $template: String
    $ownerId: UUID!
  ) {
    createPage(
      input: {
        page: {
          title: $title
          description: $description
          slug: $slug
          template: $template
          ownerId: $ownerId
        }
      }
    ) {
      query {
        pages {
          nodes {
            ...PageFragment
          }
        }
      }
    }
  }
  ${PAGE_FRAGMENT}
`;

export interface ICreatePageMutation {
  createPage: {
    page: IPage;
  };
}
