declare module '*.png';
declare module 'is-touch-device';
declare module 'graphiql';
declare module '@loadable/component';

// GraphQL API Types

interface ISiteMetadata {
  title: string;
  author: string;
  description: string;
}

interface ISection {
  title: string;
  id: string;
}

interface IPage {
  id: string;
  title: string;
  slug: string;
  description: string;
  template?: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
}
