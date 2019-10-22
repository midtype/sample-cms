import { gql } from 'apollo-boost';

export default gql`
  fragment UserFragment on MUser {
    id
    private {
      name
      email
      photoUrl
    }
  }
`;
