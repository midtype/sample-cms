import { gql } from 'apollo-boost';

export default gql`
  fragment UserFragment on User {
    id
    private {
      name
      email
      photoUrl
    }
  }
`;
