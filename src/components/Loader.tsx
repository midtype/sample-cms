import React from 'react';
import styled from 'styled-components';

import Gif from '../images/loader.gif';

const Styled = styled.header`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  mix-blend-mode: multiply;
`;

const Loader: React.FC = () => {
  return (
    <Styled>
      <img src={Gif} width={180} />
    </Styled>
  );
};

export default Loader;
