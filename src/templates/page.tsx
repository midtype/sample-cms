import React from 'react';

import Layout from '../layout/Layout';

interface IPage {
  title: string;
  description: string;
  slug: string;
}

const Page: React.FC<{ pageContext: IPage }> = props => {
  const { title, description } = props.pageContext;
  return (
    <Layout>
      <h1>{title}</h1>
      <p>{description}</p>
    </Layout>
  );
};

export default Page;
