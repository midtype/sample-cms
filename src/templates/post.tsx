import React from 'react';
import styled from 'styled-components';
import Markdown from 'react-markdown';

import Layout from '../layout/Layout';

const Styled = styled.div`
  h1 {
    margin-bottom: 1.5rem;
  }
`;

const Page: React.FC<{ pageContext: IPost }> = props => {
  const { title, body } = props.pageContext;
  return (
    <Layout>
      <Styled>
        <h1 className="header__title">{title}</h1>
        <Markdown source={body} />
      </Styled>
    </Layout>
  );
};

export default Page;
