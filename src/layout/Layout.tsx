import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import GlobalStyle from './GlobalStyle';
import Icon from '../images/midtype-logo.png';

interface IQuery {
  site: {
    siteMetadata: ISiteMetadata;
  };
}

interface IProps {
  pageTitle?: string;
  hideLines?: boolean;
  darkNav?: boolean;
}

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;

const Main = styled.main`
  margin: 3rem;
`;

const Layout: React.FC<IProps> = props => {
  const data: IQuery = useStaticQuery(query);
  const { title, description, author } = data.site.siteMetadata;
  const pageTitle = `${title}${props.pageTitle ? ` | ${props.pageTitle}` : ''}`;
  return (
    <React.Fragment>
      <Helmet
        link={[
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: `${Icon}`
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: `${Icon}`
          },
          { rel: 'shortcut icon', type: 'image/png', href: `${Icon}` }
        ]}
        title={pageTitle}
        meta={[
          {
            name: `description`,
            content: description
          },
          {
            property: `og:title`,
            content: pageTitle
          },
          {
            property: `og:description`,
            content: description
          },
          {
            property: `og:type`,
            content: `website`
          },
          {
            name: `twitter:card`,
            content: `summary`
          },
          {
            name: `twitter:creator`,
            content: author
          },
          {
            name: `twitter:title`,
            content: pageTitle
          },
          {
            name: `twitter:description`,
            content: description
          }
        ]}
      />
      <Main>{props.children}</Main>
      <GlobalStyle />
    </React.Fragment>
  );
};

export default Layout;
