import React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './client';

interface IRoot {
  element: JSX.Element;
}

export const wrapRootElement = (root: IRoot) => (
  <ApolloProvider client={client}>{root.element}</ApolloProvider>
);
