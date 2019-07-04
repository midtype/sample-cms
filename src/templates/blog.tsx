import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import remark from 'remark';
import strip from 'strip-markdown';

import Layout from '../layout/Layout';

const Styled = styled.div`
  .header__title {
    margin-bottom: 1.5rem;
  }
  .header__description {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    line-height: 2.25rem;
  }
  .blog-posts {
    margin-top: 5rem;
    margin-left: -1rem;
  }
  .blog-posts__post {
    margin-bottom: 3rem;
    padding-left: 1rem;
    border-left: 2px solid rgba(0, 0, 0, 0);
    transition: 250ms all;
    cursor: pointer;
  }
  .blog-posts__post h3 {
    color: black;
  }
  .blog-posts__post:hover {
    border-left: 2px solid rgba(0, 0, 0, 1);
  }
  .blog-posts__post p {
    margin-bottom: 0;
    margin-top: 0.5rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

interface IQueryData {
  allPosts: {
    nodes: IPost[];
  };
}

const Page: React.FC<{ pageContext: IPage; data: IQueryData }> = props => {
  const { title, description } = props.pageContext;
  const posts = props.data.allPosts.nodes;
  return (
    <Layout>
      <Styled>
        <div className="header">
          <h1 className="header__title">{title}</h1>
          <p className="header__description">{description}</p>
        </div>
        <div className="blog-posts">
          {posts.map(post => {
            let body = '';
            remark()
              .use(strip)
              .process(post.body, (_, file) => {
                body = String(file);
              });
            return (
              <Link to={`/blog/${post.slug}`} key={post.id}>
                <div className="blog-posts__post">
                  <h3>{post.title}</h3>
                  <label>{post.createdAt}</label>
                  <p>{body.slice(0, 200)}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Styled>
    </Layout>
  );
};

export const query = graphql`
  query GetPosts {
    allPosts(sort: { fields: createdAt, order: DESC }) {
      nodes {
        id
        title
        slug
        body
        createdAt(fromNow: true)
      }
    }
  }
`;

export default Page;
