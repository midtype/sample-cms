import { gql } from 'apollo-boost';

import PHOTO_FRAGMENT from './photoFragment';

export default gql`
  mutation CreatePhoto($imageId: UUID!, $ownerId: UUID!) {
    createPhoto(input: { photo: { imageId: $imageId, ownerId: $ownerId } }) {
      photo {
        ...PhotoFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
`;

export interface ICreatePhotoMutation {
  createPhoto: {
    photo: IPhoto;
  };
}
