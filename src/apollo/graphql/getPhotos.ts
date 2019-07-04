import { gql } from 'apollo-boost';

import PHOTO_FRAGMENT from './photoFragment';

export default gql`
  query GetPhotos {
    photos {
      nodes {
        ...PhotoFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
`;

export interface IPhotos {
  photos: {
    nodes: IPhoto[];
  };
}
