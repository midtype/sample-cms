import React from 'react';
import { PageRendererProps, navigate, Link } from 'gatsby';
import styled from 'styled-components';
import qs from 'query-string';

import Editor from '../layout/Editor';
import Logo from '../components/Logo';
import GoogleSignIn from '../images/google-sign-in.png';
import { setJWT } from '../utils/jwt';

const Styled = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: auto;
  padding: 5rem;

  h2 {
    margin-top: 6rem;
  }

  .google {
    width: 10rem;
    margin: 2rem auto;
  }
`;

const Login: React.FC<PageRendererProps> = props => {
  // Use Reach Routers' location function to get the query parameters in the URL.
  // Then check if we have a JWT included as a query parameter.
  const { jwt } = qs.parse(props.location.search);

  // If we have a JWT, save it to local storage so that we can include it in all
  // requests to our API from here on.
  if (jwt && typeof jwt === 'string') {
    setJWT(jwt);
    navigate('/admin');
  }
  return (
    <Editor location={props.location}>
      <Styled>
        <Logo />
        <h2>Let&#8217;s Get Editing</h2>
        <a href={process.env.GATSBY_GOOGLE_SIGN_IN}>
          <img className="google" src={GoogleSignIn} />
        </a>
      </Styled>
    </Editor>
  );
};

export default Login;
