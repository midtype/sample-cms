import { gql } from 'apollo-boost';

import POST_FRAGMENT from './postFragment';

export default gql`
  mutation SetPost(
    $id: UUID!
    $title: String
    $body: String
    $sectionId: UUID
  ) {
    updatePost(
      input: {
        id: $id
        patch: { title: $title, body: $body, sectionId: $sectionId }
      }
    ) {
      post {
        ...PostFragment
      }
    }
  }
  ${POST_FRAGMENT}
`;

export interface ISetPageMutation {
  updatePost: {
    post: IPost;
  };
}
