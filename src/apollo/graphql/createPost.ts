import { gql } from 'apollo-boost';

import POST_FRAGMENT from './postFragment';

export default gql`
  mutation CreatePost(
    $title: String
    $body: String
    $slug: String!
    $authorId: UUID!
    $sectionId: UUID!
  ) {
    createPost(
      input: {
        post: {
          title: $title
          body: $body
          authorId: $authorId
          sectionId: $sectionId
          slug: $slug
        }
      }
    ) {
      post {
        ...PostFragment
      }
    }
  }
  ${POST_FRAGMENT}
`;

export interface ICreatePostMutation {
  createPost: {
    post: IPost;
  };
}
