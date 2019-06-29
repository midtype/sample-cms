import { gql } from 'apollo-boost';

export default gql`
  fragment UserFragment on User {
    id
    name
    email
    photoUrl
  }
`;
