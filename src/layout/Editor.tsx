import React from 'react';
import styled from 'styled-components';
import { WindowLocation } from '@reach/router';
import { Query, QueryResult } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql, navigate } from 'gatsby';

import GlobalStyle from './GlobalStyle';
import Icon from '../images/midtype-logo.png';
import Loader from '../components/Loader';
import EditorNav from '../components/EditorNav';

import GET_CURRENT_USER, {
  ICurrentUser
} from '../apollo/graphql/getCurrentUser';

interface IProps {
  location: WindowLocation;
  pageTitle?: string;
}

interface IQuery {
  site: {
    siteMetadata: ISiteMetadata;
  };
}

interface IProps {
  pageTitle?: string;
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
  padding: 3rem;
  width: 85vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.04);
`;

export const UserContext = React.createContext<null | IUser>(null);

const Layout: React.FC<IProps> = props => {
  const queryData: IQuery = useStaticQuery(query);
  const { title, description, author } = queryData.site.siteMetadata;
  const pageTitle = `${title}${props.pageTitle ? ` | ${props.pageTitle}` : ''}`;
  const isLoginPage = props.location.pathname.indexOf('/login') === 0;

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
      <Query query={GET_CURRENT_USER}>
        {({ data, loading, error }: QueryResult<ICurrentUser>) => {
          if (loading) {
            return <Loader />;
          }
          if (error && !isLoginPage) {
            navigate('/');
          }
          // Redirect the user back home if they are not logged in and this is not the login page.
          if (data && !data.currentUser && !isLoginPage) {
            navigate('/');
          }
          // Redirect the user to the admin panel if they are logged in and this is the login page.
          if (data && data.currentUser && isLoginPage) {
            navigate('/admin');
          }
          // Style the login page a little differently.
          if (isLoginPage) {
            return props.children;
          }
          if (data) {
            return (
              <UserContext.Provider value={data.currentUser}>
                <Main>
                  <EditorNav />
                  {props.children}
                </Main>
              </UserContext.Provider>
            );
          }
          navigate('/');
          return null;
        }}
      </Query>
      <GlobalStyle />
    </React.Fragment>
  );
};

export default Layout;
