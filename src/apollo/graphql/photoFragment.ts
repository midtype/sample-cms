import { gql } from 'apollo-boost';

export default gql`
  fragment PhotoFragment on Photo {
    id
    image {
      id
      mimetype
      location
    }
  }
`;
