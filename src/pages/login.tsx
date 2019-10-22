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

const SIGN_IN_LINK = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=310346463088-u5mebbn91d619r4poms613jvssm1gevn.apps.googleusercontent.com&redirect_uri=https://api.midtype.com/login&access_type=offline&state=name%3D${process.env.GATSBY_MY_APP_ID}%26redirect%3D${process.env.GATSBY_MY_APP_REDIRECT_URL}&scope=profile%20email`;

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
        <a href={SIGN_IN_LINK}>
          <img className="google" src={GoogleSignIn} />
        </a>
      </Styled>
    </Editor>
  );
};

export default Login;
