import React from 'react';
import { Link, PageRendererProps } from 'gatsby';
import { Router, RouteComponentProps } from '@reach/router';
import { Query, QueryResult } from 'react-apollo';
import styled from 'styled-components';

import Editor from '../../layout/Editor';
import Loader from '../../components/Loader';
import ListItem from '../../components/ListItem';
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

const PageListing: React.FC<IPage> = props => {
  const { title, slug, description } = props;
  return (
    <Link to={`/admin/pages/${props.id}`}>
      <ListItem>
        <div className="text">
          <h3>
            {title}
            <span>{slug}</span>
          </h3>
          <p>{description}</p>
        </div>
        <Arrow />
      </ListItem>
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
              <ListItem className="add-new">
                <div className="text">
                  <h3>Create New Page</h3>
                </div>
                <Arrow />
              </ListItem>
            </Link>
          </div>
        );
      }}
    </Query>
  </Styled>
);

const AdminPages: React.FC<PageRendererProps> = props => {
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
