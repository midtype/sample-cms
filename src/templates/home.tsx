import React from 'react';
import styled from 'styled-components';

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
`;

const Page: React.FC<{ pageContext: IPage }> = props => {
  const { title, description } = props.pageContext;
  return (
    <Layout>
      <Styled>
        <div className="header">
          <h1 className="header__title">{title}</h1>
          <p className="header__description">{description}</p>
        </div>
      </Styled>
    </Layout>
  );
};

export default Page;
