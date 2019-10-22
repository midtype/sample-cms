import { gql } from 'apollo-boost';

import USER_FRAGMENT from './userFragment';

export default gql`
  query GetCurrentUser {
    mUserInSession {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export interface ICurrentUser {
  mUserInSession: IUser;
}
