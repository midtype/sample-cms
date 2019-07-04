import { gql } from 'apollo-boost';

export default gql`
  query GetSections {
    sections {
      nodes {
        id
        title
      }
    }
  }
`;

export interface ISections {
  sections: {
    nodes: Array<{ id: string; title: string }>;
  };
}
