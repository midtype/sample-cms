import React from 'react';
import { Link, PageRendererProps } from 'gatsby';
import { Router, RouteComponentProps } from '@reach/router';
import { Query, QueryResult } from 'react-apollo';
import styled from 'styled-components';

import GET_POSTS, { IPosts } from '../../apollo/graphql/getPosts';
import Arrow from '../../icons/Arrow';
import ListItem from '../../components/ListItem';
import Loader from '../../components/Loader';
import Editor from '../../layout/Editor';
import PostEditor from '../../components/BlogPostEditor';

const Styled = styled.div`
  margin-top: 3rem;
  .posts-list {
    max-width: 50rem;
    margin: auto;
  }
`;

const PostListing: React.FC<IPost> = props => {
  const { title, slug, body } = props;
  return (
    <Link to={`/admin/posts/${props.id}`}>
      <ListItem>
        <div className="text">
          <h3>
            {title}
            <span>{slug}</span>
          </h3>
          <p>{body.slice(0, 100)}</p>
        </div>
        <Arrow />
      </ListItem>
    </Link>
  );
};

const PostsList: React.FC<RouteComponentProps> = () => (
  <Styled>
    <Query query={GET_POSTS}>
      {({ data, error, loading }: QueryResult<IPosts>) => {
        if (loading) {
          return <Loader />;
        }
        if (error) {
          return null;
        }
        return (
          <div className="posts-list">
            {data &&
              data.posts.nodes.map(page => (
                <PostListing key={page.id} {...page} />
              ))}
            <Link to="/admin/posts/new">
              <ListItem className="add-new">
                <div className="text">
                  <h3>Create New Post</h3>
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

const AdminPosts: React.FC<PageRendererProps> = props => {
  return (
    <Editor location={props.location}>
      <Router>
        <PostsList path="admin/posts" />
        <PostEditor path="admin/posts/:id" />
      </Router>
    </Editor>
  );
};

export default AdminPosts;
