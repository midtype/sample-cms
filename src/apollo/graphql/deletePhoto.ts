import { gql } from 'apollo-boost';

import PHOTO_FRAGMENT from './photoFragment';

export default gql`
  mutation DeletePhoto($id: UUID!) {
    deletePhoto(input: { id: $id }) {
      photo {
        ...PhotoFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
`;
