import React from 'react';
import { PageRendererProps } from 'gatsby';
import { Query, QueryResult } from 'react-apollo';
import styled from 'styled-components';

import Editor from '../../layout/Editor';
import Loader from '../../components/Loader';
import GET_PAGES, { IPages } from '../../apollo/graphql/getPages';

const Styled = styled.div`
  margin-top: 3rem;
  .pages-list {
    max-width: 50rem;
    margin: auto;
  }
`;

const StyledPageListing = styled.div`
  padding: 2rem;
  background: white;
  margin-bottom: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  h2 span {
    margin-left: 1rem;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.5);
  }
  p {
    margin: 0;
  }
`;

const PageListing: React.FC<IPage> = props => {
  const { title, slug, description } = props;
  return (
    <StyledPageListing>
      <h2>
        {title}
        <span>{slug}</span>
      </h2>
      <p>{description}</p>
    </StyledPageListing>
  );
};

const AdminPages: React.FC<PageRendererProps> = props => {
  return (
    <Editor location={props.location}>
      <Styled>
        <Query query={GET_PAGES}>
          {({ data, error, loading }: QueryResult<IPages>) => {
            if (loading) {
              return <Loader />;
            }
            if (error) {
              return null;
            }
            return (
              <div className="pages-list">
                {data &&
                  data.pages.nodes.map(page => (
                    <PageListing key={page.id} {...page} />
                  ))}
              </div>
            );
          }}
        </Query>
      </Styled>
    </Editor>
  );
};

export default AdminPages;
