import { gql } from 'apollo-boost';

export default gql`
  fragment PageFragment on Page {
    id
    title
    slug
    description
    template
  }
`;
