import React from 'react';
import styled from 'styled-components';

import Editor from '../layout/Editor';
import GoogleSignIn from '../images/google-sign-in.png';

const Styled = styled.div`
  text-align: center;
  margin: 5rem auto;

  .google {
    width: 10rem;
    margin: 2rem auto;
  }
`;

const Login = () => (
  <Editor>
    <Styled>
      <h2>Let&#8217;s Get Editing</h2>
      <a href={process.env.GOOGLE_SIGN_IN}>
        <img className="google" src={GoogleSignIn} />
      </a>
    </Styled>
  </Editor>
);

export default Login;
