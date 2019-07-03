import React from 'react';
import { Link, PageRendererProps } from 'gatsby';
import { Router, RouteComponentProps } from '@reach/router';
import { Query, QueryResult } from 'react-apollo';
import styled from 'styled-components';

import Editor from '../../layout/Editor';
import Loader from '../../components/Loader';
import Arrow from '../../icons/Arrow';
import PageEditor from '../../components/PageEditor';
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  h3 {
    color: black;
  }
  h3 span {
    margin-left: 1rem;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.5);
  }
  p {
    margin: 0;
  }
  svg {
    flex: 0 0 2rem;
    height: 1rem;
    fill: black;
    margin-left: 2rem;
    transition: 250ms all;
  }
  &:hover svg {
    transform: translateX(5px);
  }
  &.add-new {
    background: rgba(255, 255, 0, 0.2);
  }
`;

const PageListing: React.FC<IPage> = props => {
  const { title, slug, description } = props;
  return (
    <Link to={`/admin/pages/${props.id}`}>
      <StyledPageListing>
        <div className="text">
          <h3>
            {title}
            <span>{slug}</span>
          </h3>
          <p>{description}</p>
        </div>
        <Arrow />
      </StyledPageListing>
    </Link>
  );
};

const PageList: React.FC<RouteComponentProps> = () => (
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
            <Link to="/admin/pages/new">
              <StyledPageListing className="add-new">
                <div className="text">
                  <h3>Create New Page</h3>
                </div>
                <Arrow />
              </StyledPageListing>
            </Link>
          </div>
        );
      }}
    </Query>
  </Styled>
);

const AdminPages: React.FC<PageRendererProps> = (props, c) => {
  return (
    <Editor location={props.location}>
      <Router>
        <PageList path="admin/pages" />
        <PageEditor path="admin/pages/:id" />
      </Router>
    </Editor>
  );
};

export default AdminPages;
